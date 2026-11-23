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

<!-- gen:cats -->
| cat | 是什么 | 许可 |
| --- | --- | --- |
| `aws` | AWS | 厂商图标包(商标归 AWS) |
| `azure` | Azure | 厂商图标包(商标归 Microsoft) |
| `gcp` | GCP | 厂商图标包(商标归 Google) |
| `infra` | 通用基础设施 | Apache-2.0 |
| `brand` | 品牌标识 | 按各品牌条款 |
| `si` | 品牌标识(Simple Icons) | CC0-1.0(SI 包级);个别图标另有许可 |
| `bootstrap` | Bootstrap | MIT(著作权) |
| `db` | 数据库 | Apache-2.0 |
| `ai` | AI | Apache-2.0 |
| `k8s` | Kubernetes | Apache-2.0 |
| `sec` | 安全 | Apache-2.0 |
| `obs` | 可观测性 | Apache-2.0 |
| `cat` | 猫 | Apache-2.0 |
| `dog` | 狗 | Apache-2.0 |
| `animal` | 动物 | Apache-2.0 |
| `phy` | 物理 | Apache-2.0 |
| `mech` | 机械 | Apache-2.0 |
| `military` | 军事 | Apache-2.0 |
| `chem` | 化学 | Apache-2.0 |
| `dev` | 开发流程 | Apache-2.0 |
| `github` | GitHub | Apache-2.0 |
| `circuit` | 电路 | Apache-2.0 |
| `music` | 音乐 | Apache-2.0 |
| `food` | 食物 | Apache-2.0 |
| `programming` | 语言与框架 | CC0 |
| `firebase` | Firebase | CC0 |
| `elastic` | Elastic | CC0 |
| `digitalocean` | DigitalOcean | CC0 |
| `network` | 网络设备 | Apache-2.0 |
| `base` | 底座 | Apache-2.0 |
| `frame` | 框架 | Apache-2.0 |
| `common` | 通用符号 | Apache-2.0 |
| `travel` | 旅行 | Apache-2.0 |
| `vis` | 图表 | Apache-2.0 |
| `nutrition` | 营养 | Apache-2.0 |
| `transport` | 交通工具 | Apache-2.0 |
| `aliyun` | 阿里云 | 厂商图标包(商标归阿里云) |
| `oci` | Oracle 云 | 厂商图标包(商标归 Oracle) |
| `ibm` | IBM 云 | 厂商图标包(商标归 IBM) |
| `iconpark` | IconPark | Apache-2.0 |
| `people` | 人与职业 | Apache-2.0 |
| `region` | 地区 | Apache-2.0 |
| `filetype` | 文件类型 | Apache-2.0 |
| `twemoji` | Emoji(Twemoji) | MIT |
| `fluent` | Emoji(Fluent) | MIT |
| `noto` | Emoji(Noto) | OFL-1.1 |
| `aviation` | 航空 | Apache-2.0 |
| `education` | 教育 | Apache-2.0 |
| `weather` | 天气 | Apache-2.0 |
<!-- /gen:cats -->

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
