# 不引入的 icon,以及怎么用象形合成代替

> 有些品牌标识我们**不收录** —— 不是找不到,是不能收:条款禁商用、禁改、或者条款各异到没法核对。
> 这篇列出它们是哪些、官方素材在哪,以及**用象形合成怎么把意思说到位**。

## 先说象形合成:库里没有,照样能画

iconbase 的图标是 24×24 的功能图形;**象形合成**是把它们按配方拼成一枚新的图 ——
主体图形 + 一块标签、图形里嵌图形、角上挂一枚角标、两枚并成一枚。

```
https://x-cmd.com/iconbase/draw/icon-text?icon=people/v0:team&text=IBM
```

上面这一枚是「一堆人 + 旁边的 IBM 标签」—— 说的是 IBM 这个团队,没有用 IBM 的 logo 图形。
**品牌名作为普通文字出现,用的是文字,不是商标图形** —— 这是指示性使用里最稳的一档,
也绕开了「我们能不能转发这个 logo」这个问题。

四种手法:

| 手法 | 配方 | 例子 |
| --- | --- | --- |
| 文字标签 | `/draw/icon-text?icon=<图标id>&text=<文字>` | `icon-text?icon=infra/v0:disk-array&text=(vue)` |
| 框内嵌图 | `/draw/in?icon=<框型图标id>&in=<内容图标id>` | `in?icon=frame/v0:whiteboard&in=common/v0:atom` |
| 角标 | `/draw/badge?icon=<图标id>&rl=<数字>` | `badge?icon=infra/v0:cluster&rl=5` |
| 并排 | `/draw/stack?icons=<id1>,<id2>&layout=h` | `stack?icons=db/v0:replication,db/v0:cluster&layout=h` |

图标 id 从 [`manifest.json`](https://x-cmd.com/iconbase/manifest.json) 查(键是
`<cat>:<concept>` 或 `<cat>/v<n>:<concept>`)。更多案例在
[象形合成 Gallery](https://x-cmd.com/iconbase/compose)。

## 不收录的 36 个

下面每一行都给了**官方素材的链接**(带 `nofollow` —— 我们不为这些素材背书,也不传递权重)
和**用象形合成怎么表达**。替代表达里的图形是「能说明它用途的那一枚」,配上一块品牌名标签。

| 键 | 是什么 | 条款 | 为什么不收 | 官方素材 | 替代表达(象形合成) |
| --- | --- | --- | --- | --- | --- |
| `Broadcom` | 半导体 | custom | 条款各异 | <a href="https://www.broadcom.com/support" rel="nofollow noopener">www.broadcom.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=infra/v0:cpu&text=broadcom` |
| `Chia Network` | 区块链存储 | custom | 条款各异 | <a href="https://www.chia.net/branding/" rel="nofollow noopener">www.chia.net</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=infra/v0:storage&text=chia` |
| `CocoaPods` | iOS 依赖管理 | CC-BY-NC-4.0 | 禁商用 | <a href="https://github.com/CocoaPods/shared_resources/tree/3125baf19976bd240c86459645f45b68d2facd10" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:supply-chain&text=cocoapods` |
| `Contentstack` | 内容平台 | custom | 条款各异 | <a href="https://www.contentstack.com" rel="nofollow noopener">www.contentstack.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:code&text=contentstack` |
| `Coreboot` | 核心引导 | custom | 条款各异 | <a href="https://coreboot.org/assets/images/banner.svg" rel="nofollow noopener">coreboot.org</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:assembly&text=coreboot` |
| `Dify` | AI 应用平台 | custom | 条款各异 | <a href="https://github.com/langgenius/dify/blob/48f6b2e885eb40230dfe318fe4d3fb71b50dbc02/web/public/logo/logo.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=ai/v0:agent&text=dify` |
| `Douban` | 内容社区 | custom | 条款各异 | <a href="https://www.douban.com/about" rel="nofollow noopener">www.douban.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=people/v0:meeting&text=douban` |
| `Douban Read` | 读书 | custom | 条款各异 | <a href="https://read.douban.com" rel="nofollow noopener">read.douban.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=filetype/v0:doc&text=douban%20read` |
| `Effect` | TypeScript 库 | custom | 条款各异 | <a href="https://effect.website" rel="nofollow noopener">effect.website</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=filetype/v0:javascript&text=effect` |
| `FCC` | 监管机构 | custom | 条款各异 | <a href="https://www.fcc.gov/logos" rel="nofollow noopener">www.fcc.gov</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=sec/v0:audit&text=fcc` |
| `Fedora` | Linux 发行版 | custom | 条款各异 | <a href="https://docs.fedoraproject.org/en-US/project/brand/" rel="nofollow noopener">docs.fedoraproject.org</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:release&text=fedora` |
| `Flux` | 集群编排 | custom | 条款各异 | <a href="https://github.com/cncf/artwork/blob/c2e619cdf85e8bac090ceca7c0834c5cfedf9426/projects/flux/icon/black/flux-icon-black.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=infra/v0:cluster&text=flux` |
| `GameBanana` | 游戏素材站 | CC-BY-NC-ND-4.0 | 禁商用 + 禁改 | <a href="https://gamebanana.com/tools/3474" rel="nofollow noopener">gamebanana.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=common/v0:gear&text=gamebanana` |
| `Graphite` |  | custom | 条款各异 | <a href="https://graphite.art/logo" rel="nofollow noopener">graphite.art</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=common/v0:gear&text=graphite_editor` |
| `Harbor` | 容器 registry | custom | 条款各异 | <a href="https://github.com/cncf/artwork/blob/ff2b2b5216e22f001ddd444ca580c484dd10302e/projects/harbor/icon/black/harbor-icon-black.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=infra/v0:container&text=harbor` |
| `JPEG` | 图像格式 | CC-BY-ND-4.0 | 禁改 | <a href="https://jpeg.org/contact.html" rel="nofollow noopener">jpeg.org</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=filetype/v0:image&text=jpeg` |
| `Kedro` | 数据管线 | custom | 条款各异 | <a href="https://github.com/kedro-org/kedro-brand-identity/blob/7f7b380cb1a2951c06ca292f0d2b442db895f804/icon/black/kedro-icon-svgo-black.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=vis/v0:dataflow&text=kedro` |
| `Keycloak` | 身份认证 | custom | 条款各异 | <a href="https://github.com/keycloak/keycloak-misc/blob/dee033f2d6d6b5c3a6ce8eb84e285f7e5626dbf6/logo/icon-black.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=sec/v0:key&text=keycloak` |
| `Lemmy` | 联邦论坛 | custom | 条款各异 | <a href="https://join-lemmy.org" rel="nofollow noopener">join-lemmy.org</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=people/v0:meeting&text=lemmy` |
| `Let's Encrypt` | 证书机构 | CC-BY-NC-4.0 | 禁商用 | <a href="https://letsencrypt.org/trademarks/" rel="nofollow noopener">letsencrypt.org</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=sec/v0:certificate&text=let%26%2339%3Bs%20encrypt` |
| `MiniMax` | 大模型 | custom | 条款各异 | <a href="https://github.com/MiniMax-AI/MiniMax-01/blob/57cf223b177e99636c7711a0f179e9fdc9c38e8a/figures/minimax.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=ai/v0:llm&text=minimax` |
| `Misskey` | 联邦社交 | CC-BY-NC-SA-4.0 | 禁商用 + 传染 | <a href="https://misskey-hub.net/appendix/assets.html" rel="nofollow noopener">misskey-hub.net</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=people/v0:crowd&text=misskey` |
| `NodeBB` | 论坛软件 | CC-BY-NC-4.0 | 禁商用 | <a href="https://github.com/NodeBB/assets/blob/c59a6d8db0d1be9b2666419e49b330d7b780f2b3/bb-svg/bb.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:code&text=nodebb` |
| `Pleroma` | 联邦社交 | custom | 条款各异 | <a href="https://pleroma.social" rel="nofollow noopener">pleroma.social</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=people/v0:crowd&text=pleroma` |
| `PyCQA` | Python 社区 QA | CC-BY-NC-ND-4.0 | 禁商用 + 禁改 | <a href="https://github.com/PyCQA/meta/blob/ac828d8d7eb55501addefb0ceb6496ab15e85ca5/logo/pycqa1-02.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=filetype/v0:python&text=pycqa` |
| `Qase` | 测试管理 | custom | 条款各异 | <a href="https://qase.io" rel="nofollow noopener">qase.io</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:test&text=qase` |
| `Quasar` | Vue 框架 | custom | 条款各异 | <a href="https://github.com/quasarframework/quasar-art/blob/6300e95687a923cd027dc4b8c356dd4e0cea618f/Brand/Logo/RGB/Icon/Monochrome/Cold%20Black/QUASAR_icon_mono_cold_black_RGB.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=filetype/v0:javascript&text=quasar` |
| `Robot Framework` | 测试框架 | CC-BY-NC-SA-4.0 | 禁商用 + 传染 | <a href="https://github.com/robotframework/visual-identity/blob/fadf8cda9f79ea31987a214f0047cca9626327b7/logo/robot-framework.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:unit-test&text=robot%20framework` |
| `RuboCop` | Ruby 代码检查 | CC-BY-NC-4.0 | 禁商用 | <a href="https://github.com/rubocop-semver/rubocop-ruby2_0/blob/5302f93058f7b739a73a7a6c11c566a2b196b96e/docs/images/logo/rubocop-light.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:code-review&text=rubocop` |
| `RustFS` | 文件系统 | custom | 条款各异 | <a href="https://github.com/rustfs/console/blob/3b632beee404cf195e55f558e94f343326e564f9/public/logo.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=infra/v0:storage&text=rustfs` |
| `Sass` | 样式表预处理器 | CC-BY-NC-SA-3.0 | 禁商用 + 传染 | <a href="https://sass-lang.com/styleguide/brand" rel="nofollow noopener">sass-lang.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=filetype/v0:css&text=sass` |
| `Slint` | GUI 框架 | CC-BY-ND-4.0 | 禁改 | <a href="https://github.com/slint-ui/slint/blob/10ae5cd60ab3fcd01ef89a300c97e2e0952bc750/logo/slint-logo-full-dark.png" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:design&text=slint` |
| `Tauri` | 桌面应用框架 | CC-BY-NC-ND-4.0 | 禁商用 + 禁改 | <a href="https://github.com/tauri-apps/tauri-docs/blob/b1cdfa9d7c6d0b17dae60a90266ddced40a7b384/static/img/tauri.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=infra/v0:desktop&text=tauri` |
| `Vue.js` | 前端框架 | CC-BY-NC-SA-4.0 | 禁商用 + 传染 | <a href="https://github.com/vuejs/art/blob/a1c78b74569b70a25300925b4eacfefcc143b8f6/logo.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=filetype/v0:javascript&text=vue` |
| `Webex` | 视频会议 | custom | 条款各异 | <a href="https://github.com/momentum-design/momentum-ui/blob/970c5bec962a3f72e17e0b7ed69f2c38d298c405/icons-rebrand/svg/webex-helix-filled.svg" rel="nofollow noopener">github.com</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=people/v0:meeting&text=webex` |
| `Webpack` | 打包器 | custom | 条款各异 | <a href="https://webpack.js.org/branding" rel="nofollow noopener">webpack.js.org</a> | `https://x-cmd.com/iconbase/draw/icon-text?icon=dev/v0:assembly&text=webpack` |

## 为什么是这三档

| 档 | 为什么 |
| --- | --- |
| **禁商用(CC-BY-NC-*)** | 与本库「可商用」的承诺直接冲突。NC 禁的是**使用**,不是分享,所以我们不收录、也不转发。 |
| **禁改(CC-BY-ND-*)** | 我们把 SVG 压成单行、内联进 sprite —— 算不算改编有争议。争议之下不收。 |
| **条款各异(custom)** | 品牌方自己写的使用条件(有的还要单独申请 logo 授权),我们没法逐条核对。 |

其余的收进来:默认 CC0 的、MIT / Apache-2.0 / BSD 的、要署名的(CC-BY,署名与许可链接记在
[`si-manifest.json`](si-manifest.json))、以及文件级传染的(CC-BY-SA / GPL / AGPL / MPL ——
传染的是那一个文件,不牵连全仓,各记各的许可)。

## 机器可读的准绳

这份清单也是数据:[`nonindex.json`](nonindex.json) —— 键、为什么没收录、条款、官方素材的链接。
同步 Simple Icons 时会自动更新。

## 想要某一个?

- **它有官方素材、条款允许** → 提 issue 说一声,我们按流程加进 `si:`([贡献指南](../CONTRIBUTING.md))
- **它的条款不允许**(就是上面这 36 个里的)→ 只能等品牌方松口,或者用合成表达
- **你觉得我们判断错了** → 也提 issue,把依据摆出来(条款原文、品牌方的政策页)
