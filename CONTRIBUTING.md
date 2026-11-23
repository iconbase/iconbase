# 贡献指南

图标数据仓。**只放图标本体与许可记录** —— 评审数据、设计过程、站点代码都不在这儿。

## 加一个图标

### 1. 放文件

```
icons/<cat>/<concept>.svg            平铺分类(aws / azure / gcp / brand / bootstrap …)
icons/<cat>/v<n>/<concept>.svg       版本化分类(自绘那批:infra / db / vis / travel …)
```

规矩:

- **SVG 单行** —— 一行一个 `<svg>`,不能换行。sprite 是按行切的,多行就切坏了。
  (提交的第三方整库素材可能没格式化过,构建会报出来。)
- 24×24 viewBox,彩色填充,和同分类的邻居画风一致。
- 文件名 = 概念名,小写连字符(`disk-array.svg`,不是 `diskArray.svg`)。

### 2. 补索引

`catalog.tsv` 一行一条,制表符分隔:

```
infra/v0:disk-array	磁盘阵列	Disk Array
```

- 格式是 `<id>\t<中文>\t<English>` —— **三列**,中英文分开。
- 版本化分类写**具体版本**的键(`infra/v0:disk-array`)。别名的键(`infra:disk-array`)
  由构建生成,写进去构建会报错并告诉你该写哪个键。
- id 跟文件名对得上:`<cat>/v<n>:<concept>` → `icons/<cat>/v<n>/<concept>.svg`。

### 3. 自检

```sh
node scripts/check.mjs
```

跟 service 仓的构建守同一套规矩(SVG 单行、索引与文件一一对应、分类登记、
品牌许可记录齐备)。CI 会在每个 PR 上跑它 —— 过了再提。

### 4. 提 PR

说清三件事:**这图标是什么概念**、**画的是什么(要素)**、**从哪来的(自绘 / 抄的哪个官方素材)**。

## 加一个品牌图标

`brand:` 和 `bootstrap:` 里是**别人的商标**,比普通图标多两道手续:

**一、补许可记录** —— `brands/<cat>-<concept>.md`:

```markdown
---
id: brand:example
title: Example / 示例
verdict: ok
source: 官方素材页的 URL
license: MIT / Apache-2.0 / 公有领域
licenseUrl: 条款原文 URL
trademarkOwner: 商标权人
trademarkPolicy: 商标政策页 URL
restrictions: 使用限制(不得暗示背书 / 不得改色改形 / 仅用于指代…)
reviewed: 2026-11-24
---

分析正文:查了哪个官方页面、条款怎么写、我们怎么用、什么情况下要下架。
```

`verdict` 三档:`ok`(收录)/ `caution`(收录,但只能指示性引用)/ `withheld`(留档不发布)。

**二、登记商标** —— `brands/trademarks.tsv` 加一行:

```
brand:example	Example Inc.	reviewed	官方 logo,原样使用
```

格式:`<id>\t<商标权人>\t<reviewed|pending>\t<备注>`。

名字像品牌的图标(名单在 `brands/brandish.txt`)即使没有单独记录,也**必须**在
`trademarks.tsv` 里登记 —— 构建会拦。

> 记录里也要写清**没查到什么**(比如"官方没有公开的第三方商标政策页")——
> 空白不等于没有约束。

## 新建分类

1. 在 [`cats.json`](cats.json) 里登记:标题、中英文、出处、许可、说明。
   商标类还要 `"needsRecord": true`(逐个要许可记录)。
2. 在 `versions.json` 里定推荐版本(版本化分类)。
3. `catalog.tsv` 补上每一张。
4. 整库搬入的第三方库标 `"bulk": true` —— 那类不用一行一个写描述,也不许进 `star.tsv`。

## 画新版本

1. 复制一份到 `icons/<cat>/v1/`(别改老版本,老版本还要留着)。
2. `catalog.tsv` 补上 `<cat>/v1:<concept>` 的行。
3. `versions.json` 里那个分类改成 `"v1"` —— 别名跟着走,`v0` 还在。

**推荐版是人的决定**,不是自动取最高版本。新画一版进来,别名先不动;
等这版真更好了,再改那一行。

## 红线

- **不改厂商的 SVG** —— 云厂商标识原样取用,不缩放不裁剪不改色不改形。
- **不搬运别人的设计** —— 参考只取"引喻 / 锚点"思路,严禁照搬路径形状。
- **商标图形不暗示背书** —— 只作指示性引用。
- **自绘的也别抄** —— `org:` 那族是抽象符号,不能跟任何公司的商标图形撞脸。
- **抓来的素材不进库** —— 第三方素材要进库,必须带许可记录与出处。

## 许可

本仓自绘图标与数据:Apache-2.0(见 [`LICENSE`](LICENSE))。
第三方素材各按其条款,见 [`NOTICE.md`](NOTICE.md) 与 [`licenses/`](licenses/)。
