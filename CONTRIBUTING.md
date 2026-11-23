# 贡献指南

图标数据仓。加一个图标,动三处就够 —— 细则(字段、判据、命令)在
[SKILL.md](SKILL.md) 的「如何索引」「如何分析」两节。

## 加一个图标

```sh
# 1. 放文件:icons/<cat>/[v<n>/]<concept>.svg —— 单行、24×24、自包含
# 2. 索引:catalog.tsv 加一行 <id>\t<中文>\t<English>
# 3. 自检:node scripts/check.mjs
```

- `<id>` 用**具体版本**的键(`infra/v0:server`)。别名(`infra:server`)由构建生成 ——
  写别名构建会报错并告诉你该写哪个键。
- 整库搬入的分类不用写 catalog 行(描述自动生成)。
- `check.mjs` 会一次列全问题:索引与文件对不对得上、版本登没登记、许可记录齐不齐。

**特殊情况才动**:`versions.json`(版本化分类登记推荐版)、`cats.json`(新建分类)、
`star.tsv`(每类挑 2 个)。

## 加一个品牌图标

别人的商标多两步:

1. 补一份许可记录 `brands/<cat>-<concept>.md` —— 头部记 `id` / `title` / `verdict` /
   `source` / `license` / `licenseUrl` / `trademarkOwner` / `trademarkPolicy` / `restrictions` /
   `reviewed`,正文写「查了哪个官方页面、条款怎么写、我们怎么用、什么情况下要下架」。
   **「没查到什么」也要写出来** —— 空白不等于没有约束。
2. 在 `brands/trademarks.tsv` 登记商标权人与状态。

`verdict` 三档:`ok`(政策明确、用法在许可内)/ `caution`(收录但只能指示性引用)/
`withheld`(留档不发布)。判据见 [SKILL.md](SKILL.md#10-如何分析)。

名字像品牌的图标(名单在 `brands/brandish.txt`)**必须**在 `trademarks.tsv` 里登记 ——
构建会拦。

## 红线

- 厂商与品牌的标识**不改色不改形**,只作指示性引用(不暗示背书、不与自有品牌并列成 lockup)
- 外部参考只取「引喻 / 锚点」思路,**严禁搬运路径形状**
- 抓来的素材只放 /tmp,**永不入库**(除非带着许可记录与出处)
- 禁商用(CC-BY-NC)、禁改(CC-BY-ND)、条款各异的素材**不收** —— 理由见
  [SKILL.md](SKILL.md#10-如何分析)

## 许可

本仓自绘图标与数据:Apache-2.0(见 [`LICENSE`](LICENSE))。第三方素材各按其条款,
见 [`NOTICE.md`](NOTICE.md) 与 [`docs/third-party.md`](docs/third-party.md)。
