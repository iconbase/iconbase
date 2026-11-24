# iconbase

图标数据 —— 图标本体与它们的元信息。

```
icons/            图标本体(SVG,单行自包含)
catalog.tsv       索引:<id>\t<中文>\t<English>
versions.json     每个分类当前推荐哪个版本
star.tsv          精选:每类挑 2 个
cats.json         分类的出处与许可
licenses/         第三方素材的许可原文
NOTICE.md         署名
si-manifest.json  Simple Icons 的逐图单元信息(照 SI 原样)
compose.json      哪些图标适合被合成(上下 / 框内嵌图)—— 构建灌进 manifest
```

键名 `<cat>:<concept>` 是别名(指向该分类当前推荐的版本),
`<cat>/v<n>:<concept>` 是具体版本。

取用:线上 `https://x-cmd.com/iconbase/i/<cat>/<concept>.svg`,
或直接用本仓的文件。贡献见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 键名规范

```
<cat>:<concept>            概念键 —— 别名,指向该分类当前推荐的版本
<cat>/v<n>:<concept>      具体版本 —— 钉死某一版
```

`cat` 是分类,`concept` 是分类内的概念名。分类按**素材从哪来、许可怎么算**分:

<!-- gen:cats -->
| cat | 来源 | 含义 | 许可怎么算 |
| --- | --- | --- | --- |
| `infra` | x-cmd/icon 自绘 | 通用基础设施 | Apache-2.0 |
| `db` | x-cmd/icon 自绘 | 数据库 | Apache-2.0 |
| `ai` | x-cmd/icon 自绘 | AI | Apache-2.0 |
| `k8s` | x-cmd/icon 自绘 | Kubernetes | Apache-2.0 |
| `sec` | x-cmd/icon 自绘 | 安全 | Apache-2.0 |
| `obs` | x-cmd/icon 自绘 | 可观测性 | Apache-2.0 |
| `cat` | x-cmd/icon 自绘 | 猫 | Apache-2.0 |
| `dog` | x-cmd/icon 自绘 | 狗 | Apache-2.0 |
| `animal` | x-cmd/icon 自绘 | 动物 | Apache-2.0 |
| `phy` | x-cmd/icon 自绘 | 物理 | Apache-2.0 |
| `mech` | x-cmd/icon 自绘 | 机械 | Apache-2.0 |
| `military` | x-cmd/icon 自绘 | 军事 | Apache-2.0 |
| `chem` | x-cmd/icon 自绘 | 化学 | Apache-2.0 |
| `dev` | x-cmd/icon 自绘 | 开发流程 | Apache-2.0 |
| `github` | x-cmd/icon 自绘 | GitHub | Apache-2.0 |
| `circuit` | x-cmd/icon 自绘 | 电路 | Apache-2.0 |
| `music` | x-cmd/icon 自绘 | 音乐 | Apache-2.0 |
| `food` | x-cmd/icon 自绘 | 食物 | Apache-2.0 |
| `network` | x-cmd/icon 自绘 | 网络设备 | Apache-2.0 |
| `base` | x-cmd/icon 自绘 | 底座 | Apache-2.0 |
| `frame` | x-cmd/icon 自绘 | 框架 | Apache-2.0 |
| `common` | x-cmd/icon 自绘 | 通用符号 | Apache-2.0 |
| `travel` | x-cmd/icon 自绘 | 旅行 | Apache-2.0 |
| `vis` | x-cmd/icon 自绘 | 图表 | Apache-2.0 |
| `nutrition` | x-cmd/icon 自绘 | 营养 | Apache-2.0 |
| `transport` | x-cmd/icon 自绘 | 交通工具 | Apache-2.0 |
| `people` | x-cmd/icon 自绘 | 人与职业 | Apache-2.0 |
| `region` | x-cmd/icon 自绘 | 地区 | Apache-2.0 |
| `filetype` | x-cmd/icon 自绘 | 文件类型 | Apache-2.0 |
| `aviation` | x-cmd/icon 自绘 | 航空 | Apache-2.0 |
| `education` | x-cmd/icon 自绘 | 教育 | Apache-2.0 |
| `weather` | x-cmd/icon 自绘 | 天气 | Apache-2.0 |
| `aws` | AWS 官方架构图标包 | AWS | 厂商图标包(商标归 AWS) |
| `azure` | Microsoft Azure 官方图标包 | Azure | 厂商图标包(商标归 Microsoft) |
| `gcp` | Google Cloud 官方图标集 | GCP | 厂商图标包(商标归 Google) |
| `aliyun` | 阿里云官方矢量图标包(2022 橙) | 阿里云 | 厂商图标包(商标归阿里云) |
| `oci` | Oracle OCI 官方架构图标包(V24.2) | Oracle 云 | 厂商图标包(商标归 Oracle) |
| `ibm` | IBM Cloud 官方架构图标包(architecture-icons) | IBM 云 | 厂商图标包(商标归 IBM) |
| `brand` | Wikimedia Commons(公有领域模板) | 品牌标识 | PD-simple / PD-logo(素材本身);商标权另论,各归其权利人 |
| `si` | Simple Icons | 品牌标识(Simple Icons) | CC0-1.0(SI 包级);个别图标另有许可 |
| `programming` | Simple Icons | 语言与框架 | CC0 |
| `firebase` | Simple Icons | Firebase | CC0 |
| `elastic` | Simple Icons | Elastic | CC0 |
| `digitalocean` | Simple Icons | DigitalOcean | CC0 |
| `bootstrap` | Bootstrap Icons | Bootstrap | MIT(著作权) |
| `iconpark` | IconPark(ByteDance) | IconPark | Apache-2.0 |
| `twemoji` | Twemoji | Emoji(Twemoji) | MIT |
| `fluent` | Microsoft Fluent Emoji | Emoji(Fluent) | MIT |
| `noto` | Noto Emoji | Emoji(Noto) | OFL-1.1 |
<!-- /gen:cats -->

例:`aws:ec2`、`infra:disk-array`、`db:locked`、`vis:bar`、`si:php`、`brand:kubernetes`。

> 想要某个公司的标识,走 `si:`(Simple Icons 整库,三千多个)、`brand:`(SI 没有、
> 素材在公有领域渠道的)或 `bootstrap:`(第三方库)。商标归各权利人,只作指示性引用。

分类的出处与许可是数据,记在 [`cats.json`](cats.json)。

## 版本化:自绘那批会迭代

自绘的分类(除 `aws` `azure` `gcp` `brand` `bootstrap` 外的全部)画风还会变。
一个概念可以有多个版本,**别名**指向当前推荐的那一版:

| | 键名 | 指向 |
| --- | --- | --- |
| 具体版本 | `infra/v0:gui` | 就是它自己 |
| **别名** | `infra:gui` | 该分类**当前推荐的版本** |

写 `infra:gui`,拿到的永远是"我们推荐的、最好看的那版";想钉死某一版就写全 `infra/v0:gui`。

- 目录:`icons/infra/v0/gui.svg`、`icons/infra/v1/gui.svg`
- 哪个版本算"推荐",写在 [`versions.json`](versions.json):

  ```json
  { "infra": "v0", "vis": "v2" }
  ```

  这是**人的决定**,不自动取最高版本 —— 新画一版进来,别名先不动;
  等这版真更好了,再改这一行。别名跟着走,老图也还在。

- 外部那批平铺分类(aws / azure / gcp / aliyun / oci / ibm / brand / bootstrap / iconpark)不带版本 ——
  `aws:ec2` 既是具体键也是别名。
- `catalog.tsv` 只写**具体版本**的键;别名由构建生成,写进去构建直接报错。

## 怎么取图标

线上(已加工成 sprite 与清单,按需取):

| 东西 | URL |
| --- | --- |
| 图标原文件 | `https://x-cmd.com/iconbase/i/<cat>/<concept>.svg` |
| 全库清单(英文原版 + 结构信息) | `https://x-cmd.com/iconbase/manifest.json` |
| 中文翻译包 | `https://x-cmd.com/iconbase/manifest.zh.json` |
| 分类索引 | `https://x-cmd.com/iconbase/index.json` |
| 按 id 取 data URI(给程序用) | `https://x-cmd.com/iconbase/api/icons.json?ids=<cat>:<concept>,…` |

键名带版本时路径也跟着走:`infra/v0:server` → `i/infra/v0/server.svg`。

**直接用本仓的文件**也行 —— 每个 SVG 都是自包含的单行文件,复制进你的仓库就能用:

```sh
curl -O https://raw.githubusercontent.com/iconbase/iconbase/main/icons/infra/v0/server.svg
```

## 索引:catalog.tsv

每行一条,制表符分隔:`<id>\t<中文>\t<English>`。

```
infra/v0:server	服务器	Server
infra/v0:router	路由器	Router
```

版本化分类写**具体版本**的键(`infra/v0:server`);别名(`infra:server`)由构建生成,
写进 `catalog.tsv` 构建会报错并告诉你该写哪个键。

`catalog.tsv` 是唯一事实源 —— 构建会校验它跟 `icons/` 里的文件一一对应:
多一行、少一行、id 写错,直接报错。

## 品牌图形:来源与许可

`si:` / `brand:` / `bootstrap:` 里是**别人的商标**。著作权那层(CC0 / MIT / 公有领域)
好办,商标那层才是雷区。

**元信息从哪来** —— 来自来源自己,不由我们编:

| 层 | 在哪 | 有什么 |
| --- | --- | --- |
| 分类级 | [`cats.json`](cats.json) | 每个分类的来源、许可、说明 |
| 逐图标级 | [`si-manifest.json`](si-manifest.json) | 只有 SI 给:标题、来源 URL、许可类型与原文链接、官方品牌规范链接 |

别的系列(bootstrap / iconpark / emoji / 厂商包)是整库同一许可,分类级就够,没有逐图标信息可写。

**我们怎么用**:指示性引用 —— 不改色不改形、不暗示背书、不与自有品牌并列成 lockup。
研究过程(查了哪个官方页面、条款怎么写、哪些品牌方撤了图标)在
[iconbase/mneme 的 story](https://github.com/iconbase/mneme/blob/main/story/legal/261117.icon-brand-licensing/README.md)。

## 目录

```
icons/<cat>/<concept>.svg       图标原文件 —— 平铺分类
icons/<cat>/v<n>/<concept>.svg  图标原文件 —— 版本化分类(自绘那批)
catalog.tsv                    索引:<id>\t<中文>\t<English>,一行一个(只写具体版本)
versions.json                  每个分类当前推荐哪个版本
star.tsv                       精选:每类挑 2 个 —— 首页先加载这一小包
cats.json                      分类的出处与许可
si-manifest.json               Simple Icons 的逐图标许可、来源与品牌规范链接
licenses/                      第三方素材的许可原文
docs/icon-sources.md           各分类素材从哪来
```

## 加一个图标

见 [CONTRIBUTING.md](CONTRIBUTING.md)。规矩很短:文件放进 `icons/<cat>/`,
`catalog.tsv` 补一行,新建分类要在 `cats.json` 登记,
构建会替你卡住漏掉的。

## 许可与出处

- 本仓自绘图标:Apache-2.0(见 `LICENSE`)。
- AWS / Azure / GCP 标识:来自各厂商自己的官方图标包
  ([AWS](https://aws.amazon.com/architecture/icons/)、
  [Azure](https://learn.microsoft.com/en-us/azure/architecture/icons/)、
  [Google Cloud](https://cloud.google.com/icons)),原样取 SVG;
  商标归各自权利人所有,不得改色改形。详见 `NOTICE.md`。
- `brand:` 里有一部分取自 Wikimedia Commons(公有领域 + 商标标记),
  见 `licenses/wikimedia-commons/`。

## 这个仓在生态里的位置

| 仓 | 放什么 |
| --- | --- |
| **iconbase/iconbase**(本仓) | 图标数据 + 许可记录 —— 发布源,外部贡献进这里 |
| `iconbase/service` | 站点与边缘(闭源) |
| `iconbase/mneme` | 设计与历史(私有) |

本仓的改动合入后,由 service 仓从本仓取数再发布。
