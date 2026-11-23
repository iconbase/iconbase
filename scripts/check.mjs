// 数据自检 —— 与 service 仓的构建守同一套规矩。
//
// 外部贡献者在这里就能得到反馈,不用等 service 构建才炸。
// 跟构建的差别:这里把所有问题一次列全,构建是遇到第一个就停。
//
// 用法:node scripts/check.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const ICONS_DIR = join(ROOT, 'icons');
const problems = [];
const bad = (msg) => problems.push(msg);

const verCmp = (a, b) => parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10);

// ---- cats.json:分类的出处与许可 ----
const CATS_FILE = join(ROOT, 'cats.json');
if (!existsSync(CATS_FILE)) {
  console.error('check: 找不到 cats.json —— 分类的出处与许可是数据,不能缺');
  process.exit(1);
}
const CATS = JSON.parse(readFileSync(CATS_FILE, 'utf8'));
const BULK = new Set(Object.entries(CATS).filter(([, m]) => m.bulk).map(([c]) => c));
const NEEDS_RECORD = new Set(Object.entries(CATS).filter(([, m]) => m.needsRecord).map(([c]) => c));

// ---- brands/brandish.txt:名字像品牌的 ----
const BRANDISH_FILE = join(ROOT, 'brands/brandish.txt');
let brandish = [];
if (existsSync(BRANDISH_FILE)) {
  brandish = readFileSync(BRANDISH_FILE, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
  if (!brandish.length) bad('brands/brandish.txt 是空的 —— 品牌名兜底名单不能为空');
}
const BRANDISH = new RegExp(`^(?:${brandish.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`);

// ---- brands/*.md:许可记录 ----
const records = new Map(); // id → { meta }
const BRANDS_DIR = join(ROOT, 'brands');
if (!existsSync(BRANDS_DIR)) bad('brands/ 不在 —— 品牌图形逐个要许可记录,不能没有这个目录');
for (const f of readdirSync(BRANDS_DIR).sort()) {
  if (!f.endsWith('.md')) continue;
  const text = readFileSync(join(BRANDS_DIR, f), 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) {
    bad(`brands/${f}: 没有 --- 包裹的头部`);
    continue;
  }
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  if (!meta.id) {
    bad(`brands/${f}: 头部缺 id`);
    continue;
  }
  if (!['ok', 'caution', 'withheld'].includes(meta.verdict)) {
    bad(`brands/${f}: verdict 只能是 ok / caution / withheld(现在是 "${meta.verdict}")`);
  }
  if (records.has(meta.id)) bad(`brands/: id 重复 —— ${meta.id}`);
  records.set(meta.id, { meta, file: f });
}

// ---- brands/trademarks.tsv:画了商标的清单 ----
const trademarks = new Map();
const TM_FILE = join(BRANDS_DIR, 'trademarks.tsv');
if (existsSync(TM_FILE)) {
  readFileSync(TM_FILE, 'utf8').split('\n').forEach((line, i) => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return;
    const [id, owner, status, ...rest] = t.split('\t');
    if (!id || !status) {
      bad(`brands/trademarks.tsv:${i + 1} 格式不对(应为 <id>\\t<商标权人>\\t<reviewed|pending>[\\t备注])`);
      return;
    }
    if (status !== 'reviewed' && status !== 'pending') {
      bad(`brands/trademarks.tsv:${i + 1} 状态只能是 reviewed / pending`);
      return;
    }
    trademarks.set(id, { owner: owner || '', status, note: rest.join('\t') || '' });
  });
} else {
  bad('brands/trademarks.tsv 不在 —— 画了商标的图标要登记商标权人与状态');
}

// ---- versions.json:每个分类推荐哪个版本 ----
const VERSIONS_FILE = join(ROOT, 'versions.json');
let versions = {};
if (existsSync(VERSIONS_FILE)) {
  versions = JSON.parse(readFileSync(VERSIONS_FILE, 'utf8'));
  for (const [cat, ver] of Object.entries(versions)) {
    if (!/^v\d+$/.test(ver)) bad(`versions.json: ${cat} 的版本 "${ver}" 格式不对(应为 v<n>)`);
    if (!CATS[cat]) bad(`versions.json: ${cat} 是不存在的分类`);
  }
} else {
  bad('versions.json 不在 —— 版本化分类要登记推荐版本');
}

// ---- catalog.tsv:索引 ----
const catalog = new Map();
const CATALOG_FILE = join(ROOT, 'catalog.tsv');
if (!existsSync(CATALOG_FILE)) {
  bad('catalog.tsv 不在 —— 索引是唯一事实源');
} else {
  readFileSync(CATALOG_FILE, 'utf8').split('\n').forEach((line, i) => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return;
    const [id, zh, en, ...rest] = t.split('\t');
    if (!id || !zh || !en || rest.length) {
      bad(`catalog.tsv:${i + 1} 格式不对(应为 <id>\\t<中文>\\t<English>): ${line}`);
      return;
    }
    if (catalog.has(id)) bad(`catalog.tsv:${i + 1} id 重复: ${id}`);
    catalog.set(id, { zh, en });
  });
}

// ---- 扫 icons/ ----
const found = new Map(); // 具体键 → { file, cat, version, concept }
const catVersions = new Map(); // cat → 版本列表
if (!existsSync(ICONS_DIR)) {
  bad('icons/ 不在 —— 这里放图标本体');
} else {
  for (const cat of readdirSync(ICONS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    const catName = cat.name;
    if (!CATS[catName]) {
      bad(`icons/${catName}/ 是不认识的分类 —— 先在 cats.json 里登记`);
      continue;
    }
    const dir = join(ICONS_DIR, catName);
    const entries = readdirSync(dir);
    const vdirs = entries.filter((e) => /^v\d+$/.test(e)).sort(verCmp);
    const flat = entries.filter((e) => !/^v\d+$/.test(e)).sort();

    if (vdirs.length && flat.length) {
      bad(`icons/${catName}/ 里版本目录与平铺文件混在一起 —— 一个分类要么全版本化,要么全平铺`);
      continue;
    }

    const add = (file, id, concept, version) => {
      const ext = file.split('.').pop();
      if (ext !== 'svg') {
        bad(`icons/${catName}/${version ? version + '/' : ''}${file}: 只接受 SVG`);
        return;
      }
      const raw = readFileSync(join(dir, version ? join(version, file) : file), 'utf8');
      if (raw.replace(/\n$/, '').includes('\n')) {
        bad(`icons/${catName}/${version ? version + '/' : ''}${file}: 图标文件必须单行(sprite 一行一个 symbol)`);
      }
      // 许可结论 withheld 的不发布 —— 与构建一致:文件留着,只是不进清单
      const rec = records.get(id);
      if (NEEDS_RECORD.has(catName) && rec && rec.meta.verdict === 'withheld') return;
      if (found.has(id)) bad(`id 重复: ${id}`);
      found.set(id, { file: `icons/${catName}/${version ? version + '/' : ''}${file}`, cat: catName, version, concept });
    };

    if (vdirs.length) {
      catVersions.set(catName, vdirs);
      for (const vd of vdirs) {
        for (const f of readdirSync(join(dir, vd)).sort()) {
          const concept = f.slice(0, -(f.split('.').pop().length + 1));
          add(f, `${catName}/${vd}:${concept}`, concept, vd);
        }
      }
    } else {
      for (const f of flat) {
        const concept = f.slice(0, -(f.split('.').pop().length + 1));
        add(f, `${catName}:${concept}`, concept, null);
      }
    }
  }
}

// ---- 别名:版本化分类里,概念键指向推荐版本 ----
const alias = new Map();
for (const [catName, vers] of catVersions) {
  const rec = versions[catName];
  if (!rec) {
    bad(`icons/${catName}/ 是版本化分类,versions.json 里没有登记 —— 补一行 "${catName}": "v0"`);
    continue;
  }
  if (!vers.includes(rec)) {
    bad(`versions.json: ${catName} 推荐 ${rec},但 icons/${catName}/${rec}/ 不存在`);
    continue;
  }
  for (const [id, info] of found) {
    if (info.cat !== catName) continue;
    let target = rec;
    if (!found.has(`${catName}/${target}:${info.concept}`)) {
      target = [...vers].sort((a, b) => verCmp(b, a)).find((v) => found.has(`${catName}/${v}:${info.concept}`));
      if (target == null) continue;
    }
    alias.set(`${catName}:${info.concept}`, `${catName}/${target}:${info.concept}`);
  }
}

// ---- 索引与文件一一对应 ----
for (const [id, info] of found) {
  if (catalog.has(id)) continue;
  if (BULK.has(info.cat)) continue; // 整库搬入的:描述自动生成
  bad(`catalog.tsv 缺一行: ${id}\t(自己补一行描述)`);
}
for (const id of catalog.keys()) {
  if (alias.has(id)) {
    bad(`catalog.tsv 里的 ${id} 是别名 —— 别名由构建生成,只写具体版本的键 ${alias.get(id)}`);
    continue;
  }
  if (!found.has(id)) bad(`catalog.tsv 里的 ${id} 没有对应文件`);
}
for (const cat of Object.keys(versions)) {
  if (!catVersions.has(cat)) bad(`versions.json 里登记了 ${cat},但 icons/${cat}/ 下没有版本目录`);
}

// ---- 品牌闸门 ----
for (const [id, rec] of records) {
  if (rec.meta.verdict === 'withheld') continue; // 不发布 —— 文件留着,只是不进清单
  if (!found.has(id)) bad(`brands/ 里的 ${id} 没有对应图标文件`);
  if (!trademarks.has(id)) bad(`brands/ 里的 ${id} 没在 brands/trademarks.tsv 登记`);
}
for (const id of trademarks.keys()) {
  if (!found.has(id)) bad(`brands/trademarks.tsv 里的 ${id} 没有对应图标文件`);
}
// 品牌闸门只作用在需要逐个记录许可的分类上(brand / bootstrap)——
// 自绘的分类里出现 "javascript" 这种词不算商标问题。
for (const [id, info] of found) {
  if (!NEEDS_RECORD.has(info.cat)) continue;
  const rec = records.get(id);
  const tm = trademarks.get(id);
  if (rec && tm && tm.status !== 'reviewed') {
    bad(`${id} 有许可记录,但 trademarks.tsv 里状态是 ${tm.status} —— 改成 reviewed`);
  }
  if (!tm && BRANDISH.test(info.concept)) {
    bad(`${id} 名字像品牌图标 —— 在 brands/trademarks.tsv 里登记(商标权人 + 状态)`);
  }
}

// ---- star.tsv:精选 ----
const STAR_FILE = join(ROOT, 'star.tsv');
if (existsSync(STAR_FILE)) {
  for (const line of readFileSync(STAR_FILE, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [cat, list] = t.split('\t');
    if (!cat || !list) continue;
    if (BULK.has(cat)) bad(`star.tsv: ${cat} 是整库搬进来的分类 —— 不进 star`);
    for (const c of list.split(',').map((x) => x.trim()).filter(Boolean)) {
      const id = `${cat}:${c}`;
      if (!alias.has(id) && !found.has(id)) bad(`star.tsv: ${id} 没有对应的图标`);
    }
  }
}

// ---- 结论 ----
if (problems.length) {
  console.error(`check: ${problems.length} 个问题\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`check: 全过 —— ${found.size} 个图标,${Object.keys(CATS).length} 个分类,${records.size} 份许可记录`);
