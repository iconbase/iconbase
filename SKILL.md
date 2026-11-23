---
name: iconbase
description: Fetch and use icons from the iconbase icon library — infrastructure, cloud vendor marks, database, K8s, security, observability, charts, travel and everyday concepts, addressable as <cat>:<concept>. Use when adding icons to diagrams, documentation, READMEs, slides, or when an agent needs a licensed, consistent SVG instead of an ad-hoc emoji or hand-rolled path.
---

# 用 iconbase 取图标

```
https://x-cmd.com/iconbase/i/<cat>/<concept>.svg
```

按 `<cat>:<concept>` 取图标 —— 云厂商标识、自绘概念、图表、emoji,一万五千多个,每个都是单行、自包含、可直接嵌进文档的 SVG。

## 1. 核心理念

**键名就是语义。** `<cat>:<concept>` 里 cat 是分类(按**素材从哪来、许可怎么算**分),concept 是概念名。键名读出来就是画面:`db:locked` = 数据库 + 锁,`infra:disk-array` = 磁盘阵列。

**别名指向推荐版。** 自绘的分类会迭代,`<cat>:<concept>` 永远给你当前推荐的那一版;要钉死某一版写全 `<cat>/v<n>:<concept>`。

**许可写在数据里。** 每张图标都知道自己从哪来、什么条款 —— 自绘的是 Apache-2.0,厂商的是原厂 SVG 原样(商标归权利人),品牌图形逐个分析过。

## 2. 什么时候用 / 不用

**用**:README / 文档 / 幻灯片配图;架构图、流程图里的节点图标;需要**一致且许可干净**的图形;agent 要给一段文字配图。

**不用**:需要照片级或插画级质感(这是 24×24 网格的功能性图标);要现成品牌的官方 Logo 素材(走 `brand:` 分类,商标归各家);纯粹为了装饰。

## 3. 工作流程

1. **定分类**:先想清楚这个概念属于哪一族(云服务 → `aws`/`azure`/`gcp`;数据库 → `db`;安全 → `sec`;图表 → `vis`;生活概念 → `travel`/`food`/`weather`…)。分类决定许可怎么算,别混。
2. **查键名**:`https://x-cmd.com/iconbase/manifest.json` 是全库清单(英文 id + 结构信息),`manifest.zh.json` 是中文名;也可以在站点上搜。
3. **取文件**:`curl` 那个 `i/<cat>/<concept>.svg` 就行,或者用 data URI 接口一次性拿多个。
4. **落到文档里**:markdown 里用 `![](https://x-cmd.com/iconbase/i/<cat>/<concept>.svg)`;HTML/代码里直接内联 SVG(自包含,无外部依赖)。
5. **核许可**:自绘的随便用(Apache-2.0,保留 NOTICE);厂商标识原样用、不改色不改形;品牌图形看清单里的许可结论,`caution` 的只做指示性引用。

## 4. 分类目录

| cat | 是什么 | 许可 |
| --- | --- | --- |
| `aws` `azure` `gcp` `aliyun` `oci` `ibm` | 云厂商官方服务标识 | 原厂 SVG,商标归各家 |
| `infra` `network` `base` `frame` `common` | 通用基础设施、设备、底座、框架、共用符号 | Apache-2.0 |
| `db` `ai` `k8s` `sec` `obs` `dev` | 数据库、AI 架构、K8s 组件、安全、可观测性、开发流程 | Apache-2.0 |
| `chem` `circuit` `music` `food` `animal` `cat` `dog` | 学科与日常物件、动物 | Apache-2.0 |
| `phy` `mech` `military` | 物理、机械、通用军备符号 | Apache-2.0 |
| `travel` `nutrition` `transport` `weather` `education` `aviation` `people` `region` `filetype` | 生活与专题场景 | Apache-2.0 |
| `vis` | 图表 —— 柱/线/饼/仪表/时间线/流程/地图等 | Apache-2.0 |
| `si` | Simple Icons 整库 —— 品牌与技术项目的标识(三千多个) | CC0 为主,个别另有许可 |
| `brand` `bootstrap` `iconpark` `programming` `firebase` `elastic` `digitalocean` | 品牌与第三方图标库 | 逐个看记录;整库搬入的按库的条款 |
| `twemoji` `fluent` `noto` | emoji —— 同一批概念三种画法 | MIT / MIT / OFL-1.1 |

全表与逐项说明见 [`README.md`](README.md)。

## 5. 怎么取

```sh
# 单个图标文件
curl -O https://x-cmd.com/iconbase/i/infra/v0/server.svg

# 一次拿多个,返回 { id: "data:image/svg+xml;base64,…" }
curl 'https://x-cmd.com/iconbase/api/icons.json?ids=infra:server,db:locked'
```

- 键名带版本时路径跟着走:`infra/v0:server` → `i/infra/v0/server.svg`。
- 别名与具体版本两个键都取得到,别名指向的就是推荐版本那份文件。
- 想把图标内嵌进 SVG、PPT 或 HTML,用 data URI 接口(`ids=` 逗号分隔)。

**要合成**(角标、图内嵌图、图文并排)用 draw 的合成接口 —— `https://x-cmd.com/iconbase/draw/badge?icon=infra:disk&text=x2` 之类;合成的 id 本身也可以再当图标用。合成引擎的完整用法见 x-cmd/draw 的 skill。

## 6. 版本与别名

| | 键名 | 拿到什么 |
| --- | --- | --- |
| 别名 | `infra:server` | 该分类**当前推荐**的版本 |
| 具体版本 | `infra/v0:server` | 钉死那一版 |

推荐版是**人的决定**,记在 `versions.json`;不是自动取最高版本。新画一版进来,老版仍在,别名先不动。

## 7. 许可边界

- **自绘的**(`infra` `db` `sec` `vis` …)Apache-2.0,署名见 `NOTICE.md`。
- **厂商标识**(`aws` `azure` `gcp` …)原样取自厂商官方包,**不得改色改形**;商标归各自权利人,只作指示性引用。
- **想要某个公司的标识**走 `si:`(Simple Icons 整库)/ `brand:`(我们逐个核过的那几个)/ `bootstrap:`(第三方库)。
- **`brand:` / `bootstrap:` 是别人的商标**,每个都有一份许可记录(`brands/<cat>-<concept>.md`),记录里写了结论(`ok` / `caution` / `withheld`)、商标权人与限制条款。`withheld` 的不发布。
- 拿不准就去看清单里的许可字段,或者去 `brands/` 找那份记录。

## 8. 贡献

加图标、改图标、补许可记录 → 见 [`CONTRIBUTING.md`](CONTRIBUTING.md)。构建会替你卡住漏掉的东西:文件没有对应的 `catalog.tsv` 行、品牌没有许可记录、版本目录不存在,都直接报错。
