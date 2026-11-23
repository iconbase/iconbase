# iconbase

图标数据 —— 图标本体与它们的许可记录。

```
icons/            图标本体(SVG,单行自包含)
catalog.tsv       索引:<id>\t<中文>\t<English>
versions.json     每个分类当前推荐哪个版本
star.tsv          精选:每类挑 2 个
cats.json         分类的出处与许可
brands/           品牌图形的许可记录(逐个分析)
licenses/         第三方素材的许可原文
NOTICE.md         署名
si-manifest.json  Simple Icons 的逐图标许可与来源
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

| cat | 来源 | 含义 | 许可怎么算 |
| --- | --- | --- | --- |
| `aws` `azure` `gcp` `aliyun` `oci` `ibm` | 厂商官方图标包 | 云服务 | 原厂 SVG 原样;商标归各自权利人,见 `NOTICE.md` |
| `infra` | 本仓自绘 | 通用基础设施概念 | 本仓 Apache-2.0 |
| `si` | Simple Icons(整库) | 品牌与技术项目的标识 —— 批量 | CC0 为主,个别图标另有许可,逐条记在 `si-manifest.json` |
| `brand` | 官方渠道 / Wikimedia Commons | SI 不提供的品牌图形 | **逐个按该品牌的条款分析**,记在 `brands/` 里 |
| `bootstrap` | Bootstrap Icons(整库) | 第三方图标库的全部图标 | 著作权 MIT;画了品牌的那五十来个另有登记 |
| `iconpark` | IconPark(字节跳动,整库) | 多彩填充风的通用概念 | 著作权 Apache-2.0;品牌类不收 |
| `db` | 本仓自绘 | 数据库的概念与形态 | 本仓 Apache-2.0 |
| `ai` | 本仓自绘 | AI 架构里的通用概念 | 本仓 Apache-2.0 |
| `k8s` | 本仓自绘 | K8s 组件概念(非官方标识) | 本仓 Apache-2.0 |
| `sec` | 本仓自绘 | 安全概念 | 本仓 Apache-2.0 |
| `obs` | 本仓自绘 | 指标 / 日志 / 链路 | 本仓 Apache-2.0 |
| `cat` `dog` `animal` | 本仓自绘 | 动物 | 本仓 Apache-2.0 |
| `chem` `circuit` `music` `food` | 本仓自绘 | 化学 / 电路 / 音乐 / 食物 | 本仓 Apache-2.0 |
| `military` | 本仓自绘 | 海军 / 空军 / 陆军的通用装备符号(不指向任何国家的具体部队) | 本仓 Apache-2.0 |
| `phy` `mech` | 本仓自绘 | 物理(原子/分子/力学/电磁/光学)、机械(齿轮/轴承/阀门/泵) | 本仓 Apache-2.0 |
| `travel` `nutrition` `transport` `weather` `education` | 本仓自绘 | 旅行 / 营养 / 交通工具 / 天气 / 教育 —— 日常生活与专题用得上的概念 | 本仓 Apache-2.0 |
| `people` `region` `filetype` `aviation` | 本仓自绘 | 人与职业(中性表达)/ 地区 / 文件类型 / 航空与航天 | 本仓 Apache-2.0 |
| `vis` | 本仓自绘 | 图表 —— 统计图表 / 架构图 / 时序与流程图 / 地图 / 乐谱 / 化学式 | 本仓 Apache-2.0 |
| `twemoji` `fluent` `noto` | emoji 官方集(整库) | emoji —— 同一批概念三种画法(Twemoji / 微软 Fluent / Google Noto) | MIT / MIT / OFL-1.1;不进 sprite,按片发 |
| `dev` | 本仓自绘 | 开发项目流程 —— 通用阶段 / 软件 / 硬件 | 本仓 Apache-2.0 |
| `common` | 本仓自绘 | 全库共用的基本符号 —— 锁 / 时钟 / 对勾 / 同步 | 本仓 Apache-2.0 |

例:`aws:ec2`、`infra:disk-array`、`db:locked`、`vis:bar`、`si:php`、`brand:kubernetes`。

> 想要某个公司的标识,走 `si:`(Simple Icons 整库)、`brand:`(我们逐个核过的那几个)或
> `bootstrap:`(第三方库)—— 三处都要有许可记录。

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

## 品牌图形:逐个按许可分析

`brand:` 和 `bootstrap:` 里的图标是**别人的商标**。著作权那层(MIT / Apache-2.0)好办,
商标那层才是雷区 —— 所以每个品牌都要有一份记录,记在 `brands/<cat>-<concept>.md`:

```markdown
---
id: bootstrap:alipay
title: 支付宝 / Alipay
verdict: caution
source: Bootstrap Icons 1.13.1 · https://…
license: MIT(图标素材的著作权)
licenseUrl: https://github.com/twbs/icons/blob/main/LICENSE
trademarkOwner: 蚂蚁集团(Ant Group Co., Ltd. 及其关联公司)
trademarkPolicy: https://docs.alipayplus.com/…
restrictions: 不得暗示蚂蚁背书或合作;不得当作自己的标识;仅用于指代该品牌
reviewed: 2026-11-17
---

(下面是分析正文:查了哪个官方页面、条款怎么写、我们怎么用、什么情况下要下架)
```

`verdict` 三档:

| verdict | 意思 | 构建行为 |
| --- | --- | --- |
| `ok` | 政策明确、我们的用法在许可范围内 | 收录 |
| `caution` | 收录,但只能指示性引用,页面上带「谨慎」标记 | 收录 |
| `withheld` | 分析留档,**不发布** | 图标不进清单,记录留着 |

构建时的硬规则:`brand` / `bootstrap` 里的图标**没有记录直接报错**;
记录里的 id 没有对应文件也报错。所以"逐个按许可分析"不是靠自觉,是靠构建卡住的。

名字像品牌的图标(名单在 [`brands/brandish.txt`](brands/brandish.txt))还必须在
`brands/trademarks.tsv` 里登记商标权人与状态。

> 记录里也要写清**没查到什么**(比如"腾讯没有公开的第三方商标政策页")——
> 空白不等于没有约束。

## 目录

```
icons/<cat>/<concept>.svg       图标原文件 —— 平铺分类
icons/<cat>/v<n>/<concept>.svg  图标原文件 —— 版本化分类(自绘那批)
catalog.tsv                    索引:<id>\t<中文>\t<English>,一行一个(只写具体版本)
versions.json                  每个分类当前推荐哪个版本
star.tsv                       精选:每类挑 2 个 —— 首页先加载这一小包
cats.json                      分类的出处与许可
brands/<cat>-<concept>.md      品牌图形的许可记录(brand / bootstrap 必须有)
brands/trademarks.tsv          画了商标的图标清单(商标权人 + 状态)
brands/brandish.txt            名字像品牌的 —— 必须在 trademarks.tsv 里登记
si-manifest.json               Simple Icons 的逐图标许可、来源与品牌规范链接
licenses/                      第三方素材的许可原文
docs/icon-sources.md           各分类素材从哪来
```

## 加一个图标

见 [CONTRIBUTING.md](CONTRIBUTING.md)。规矩很短:文件放进 `icons/<cat>/`,
`catalog.tsv` 补一行,新建分类要在 `cats.json` 登记,
品牌类要补 `brands/` 的许可记录 —— 构建会替你卡住漏掉的。

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
