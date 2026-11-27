// 给自绘的 SVG 补上元信息:<title> / <desc> / <metadata> / aria。
//
// 为什么只补自绘那批:
//   - 第三方(SI / emoji)要么上游自己带 <title>(SI),要么名字就是概念 slug(emoji),
//     而且我们承诺「照原样」—— 一个字节都不动。
//   - 自绘是我们自己的(Apache-2.0),想怎么写怎么写。
//
// 关键词从哪来:keywords.json(模型提取的那一批,词 → 关键词)。
// 关键词只放英文的 —— 中文名与中文关键词在名字表与图标页上,文件里不重复。
//
// 幂等:已经有 <title> 的跳过,重跑不会注两遍。
//
// 用法:node scripts/svg-meta.mjs [--dry-run]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const DRY = process.argv.includes('--dry-run');

const CATS = JSON.parse(fs.readFileSync(path.join(ROOT, 'cats.json'), 'utf8'));
const KW_FILE = path.join(ROOT, 'keywords.json');
if (!fs.existsSync(KW_FILE)) {
  console.error('keywords.json 没有 —— 先跑 mneme 的 scripts/extract-keywords.mjs,再把结果放过来');
  process.exit(1);
}
const KW = JSON.parse(fs.readFileSync(KW_FILE, 'utf8'));

// 名字:英文名 + 中文名(取自 catalog.tsv)
const names = new Map();
for (const line of fs.readFileSync(path.join(ROOT, 'catalog.tsv'), 'utf8').split('\n')) {
  if (!line.trim() || line.startsWith('#')) continue;
  const [id, zh, en] = line.split('\t');
  if (id) names.set(id, { zh, en });
}

// 自绘那批的分类
const own = new Set(
  Object.entries(CATS)
    .filter(([, v]) => (v.group || '') === '自绘')
    .map(([k]) => k),
);

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

let touched = 0;
let skipped = 0;
for (const cat of own) {
  const dir = path.join(ROOT, 'icons', cat);
  if (!fs.existsSync(dir)) continue;
  for (const ver of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
    const vdir = path.join(dir, ver);
    if (!fs.statSync(vdir).isDirectory()) continue;
    for (const f of fs.readdirSync(vdir)) {
      if (!f.endsWith('.svg')) continue;
      const id = `${cat}/${ver}:${f.slice(0, -4)}`;
      const file = path.join(vdir, f);
      const raw = fs.readFileSync(file, 'utf8');
      if (raw.includes('<title>')) {
        skipped++;
        continue;
      }
      const nm = names.get(id);
      if (!nm) continue;
      const kws = (KW[id]?.k || KW[id]?.keywords || []).filter((k) => /^[\x20-\x7e]+$/.test(k)).slice(0, 12);
      const title = nm.en || id;
      const catTitle = CATS[cat]?.title || cat;
      const desc = [
        `${nm.en || id}${nm.zh && nm.zh !== nm.en ? ` (${nm.zh})` : ''} — ${catTitle}.`,
        kws.length ? `Related: ${kws.join(', ')}.` : '',
      ]
        .filter(Boolean)
        .join(' ');
      const meta = {
        title,
        description: desc,
        subject: kws,
        rights: CATS[cat]?.license || 'Apache-2.0',
        source: `https://x-cmd.com/iconbase/icon/${id}`,
      };
      const metaXml = `<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>${esc(meta.title)}</dc:title><dc:description>${esc(meta.description)}</dc:description>${
        meta.subject.length ? `<dc:subject>${esc(meta.subject.join(', '))}</dc:subject>` : ''
      }<dc:rights>${esc(meta.rights)}</dc:rights><dc:source>${esc(meta.source)}</dc:source></metadata>`;
      // 插在 <svg ...> 之后、图形之前
      const out = raw.replace(
        /(<svg\b[^>]*>)/,
        `$1<title>${esc(title)}</title><desc>${esc(desc)}</desc>${metaXml}`,
      );
      // 无障碍:role 与 aria-label
      const out2 = out.replace(
        /<svg\b([^>]*)>/,
        (m, attrs) =>
          /role=/.test(attrs)
            ? m
            : `<svg${attrs} role="img" aria-label="${esc(title)}">`,
      );
      if (out2 === raw) continue;
      touched++;
      if (!DRY) fs.writeFileSync(file, out2);
    }
  }
}
console.log(`${DRY ? '(dry-run)' : ''}: 补了 ${touched} 枚,已有 title 跳过 ${skipped} 枚`);
