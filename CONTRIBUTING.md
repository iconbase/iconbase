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
- `check.mjs` 会一次列全问题:索引与文件对不对得上、版本登没登记。

**特殊情况才动**:`versions.json`(版本化分类登记推荐版)、`cats.json`(新建分类)、
`star.tsv`(每类挑 2 个)。

## 品牌图形

**原则上不收单个品牌** —— `si:` 分类是 Simple Icons 整库,三千多个品牌标识都在那儿,
来源与逐图标的许可都由它给(`si-manifest.json`)。`bootstrap:` 是第三方库整库。

只有一种情况值得单独收:**SI 没有,而权利人自己在公有领域渠道上传了官方画作**
(`brand:` 里的三个就是 —— Wikimedia Commons 上的 PD 画作)。

这类的判断过程(查了哪个官方页面、条款怎么写、哪些品牌方撤了图标)在
[iconbase/mneme 的 story](https://github.com/iconbase/mneme/blob/main/story/legal/261117.icon-brand-licensing/README.md),
那边查完了、确认能收,再往这边加图标 + `catalog.tsv` 一行。

**禁商用(CC-BY-NC)、禁改(CC-BY-ND)、条款各异的素材不收。**

## 红线

- 厂商与品牌的标识**不改色不改形**,只作指示性引用(不暗示背书、不与自有品牌并列成 lockup)
- 外部参考只取「引喻 / 锚点」思路,**严禁搬运路径形状**
- 抓来的素材只放 /tmp,**永不入库**(除非带着来源与许可)
- 禁商用(CC-BY-NC)、禁改(CC-BY-ND)、条款各异的素材**不收** —— 理由见
  [SKILL.md](SKILL.md#10-如何分析)

## 许可

本仓自绘图标与数据:Apache-2.0(见 [`LICENSE`](LICENSE))。第三方素材各按其条款,
见 [`NOTICE.md`](NOTICE.md) 与 [`docs/third-party.md`](docs/third-party.md)。
