# iconbase:给人和 agent 一个不用担心的图标库

## 首要目标:画架构图

架构图、流程图、幻灯片、README —— 图标是这些东西的**零件**。iconbase 的目标就一件:
**让画图的人(或 agent)拿到一枚语义准确、许可干净、可以直接嵌进去的图标。**

两件事因此是硬要求:

1. **语义准** —— 键名读出来就是画面(`db:locked` = 数据库 + 锁),别名永远指向当前推荐的版本。
2. **许可干净** —— 每枚图标都知道自己从哪来、什么条款;拿不准的我们不收([不引入的 36 个](not-included.md))。

## 现在有什么

| | |
| --- | --- |
| 图标 | **18798** 枚,49 个分类 |
| 自绘 | 32 个分类、776 枚 —— 24×24 网格、彩色填充,Apache-2.0 |
| 第三方 | 17 个分类、18022 枚 —— 厂商官方包、Simple Icons、Bootstrap、IconPark、三套 emoji |
| 象形合成 | 四种手法:文字标签 / 框内嵌图 / 角标 / 并排;角标里还能挂图标;产物是 SVG,可长缓存、可进版本库 |
| 评分 | AI 盲评 + 人工反馈,均分 < 8 进重设计队列([评分系统](rating.md)) |
| 站点 | https://x-cmd.com/iconbase/ |

第三方里最大的几套:Twemoji 4009、Noto 3750、Simple Icons 3436、IconPark 2555、Bootstrap 2078、Fluent 1231。
SVG 总体积 54.9 MB。

## 许可与协议

**元信息两层,都来自来源自己** —— 我们不自己编:

| 层 | 在哪 | 内容 |
| --- | --- | --- |
| 分类级 | [`cats.json`](../cats.json) | 每个分类的来源、许可、说明 |
| 逐图标级 | [`si-manifest.json`](../si-manifest.json) | 只有 Simple Icons 给:标题、来源 URL、许可类型与原文链接、官方品牌规范链接 |

**商标另说。** 著作权那层干净(CC0 / MIT / Apache-2.0 / 公有领域),商标权归各个品牌。
我们按**指示性使用**处理:不改色不改形、不暗示背书、不与自有品牌并列成 lockup。
Simple Icons 收录时若品牌给了使用规范,链接一并记下。

**不收的三档**:禁商用(CC-BY-NC)、禁改(CC-BY-ND)、条款各异(custom)。
理由与替代表达见 [不引入的 icon,以及怎么用象形合成代替](not-included.md)。

**我们不主张权利** —— 自绘部分按 Apache-2.0 发布;第三方部分各按其条款,
署名见 [`NOTICE.md`](../NOTICE.md) 与 [`licenses/`](../licenses/)。
权利人要对某个图标下架,走 [下架申请](takedown.md)。

## 怎么用

**拿图标**:

```
https://x-cmd.com/iconbase/i/<cat>/<concept>.svg          枚 SVG
https://x-cmd.com/iconbase/manifest.json                  全库清单(机器读)
https://x-cmd.com/iconbase/index.json                     分类索引
https://x-cmd.com/iconbase/api/icons.json?ids=a,b         按 id 取 data URI
```

**象形合成**:

```
https://x-cmd.com/iconbase/draw/icon-text?icon=<id>&text=<文字>
https://x-cmd.com/iconbase/draw/in?icon=<框型id>&in=<内容id>
https://x-cmd.com/iconbase/draw/badge?icon=<id>&rl=<数字>
https://x-cmd.com/iconbase/draw/stack?icons=<id1>,<id2>&layout=h
```

键名规范:`<cat>:<concept>` 是别名(指向该分类当前推荐的版本),
`<cat>/v<n>:<concept>` 是具体版本。清单在 `manifest.json` 里,
[象形合成 Gallery](https://x-cmd.com/iconbase/compose) 有可复制的例子。

## 相关

- [让 agent 检索 iconbase](agent.md) —— 一句 prompt + llms.txt + skill
- [不引入的 icon,以及怎么用象形合成代替](not-included.md)
- [评分系统](rating.md)
- [下架申请](takedown.md)
- [贡献指南](../CONTRIBUTING.md)
