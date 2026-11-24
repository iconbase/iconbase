# 第三方素材的许可

本仓的图标分两类:**我们自绘的**(Apache-2.0)与**第三方素材**(按各自的条款)。这份文档说清
第三方素材的来源与许可处理。

元信息只有两层,都是机器可读的准绳:**分类级**在 [`cats.json`](../cats.json),
**逐图标级**在 [`si-manifest.json`](../si-manifest.json)(只有 SI 给逐图标数据)。
研究过程在 [iconbase/mneme 的 story](https://github.com/iconbase/mneme/blob/main/story/legal/261117.icon-brand-licensing/README.md)。

## Simple Icons(`si:` 分类)

SI v<!-- gen:si-version -->
v16.38.1
<!-- /gen:si-version -->,整库搬入,**逐字节照抄**,一个字节都没改。

**SI 的包是 CC0,但不是每个图标都是。** SI 自己的免责声明写着:「Simple Icons is released
under CC0 — though that doesn't mean to imply that all icons within the project are also
CC0. Please see individual licenses where available.」—— 大部分图标没有单独的许可条目
(走包级默认),有条目的那些按条目走。

### 收进来的

<!-- gen:si-licences -->
| 许可 | 数量 | 怎么处理 |
| --- | ---: | --- |
| CC0-1.0(默认 / 明写) | 3259 | 直接用 |
| Apache-2.0 / MIT / BSD-3-Clause / Unlicense | 84 | 直接用 |
| CC-BY-4.0 / 3.0 / 2.5 | 24 | **要署名** —— 署名与许可链接记在 `si-manifest.json` |
| CC-BY-SA-4.0 / 3.0 / 2.5 / 2.0 | 44 | **文件级传染** —— 传染的是那一个文件,不牵连全仓;各记各的许可 |
| GPL-2.0/3.0、AGPL-3.0、MPL-2.0 | 25 | 同上,文件级 |

共 3436 个。
<!-- /gen:si-licences -->

CC 与 GPL 都明确 mere aggregation 不传染,所以这些文件放在 Apache-2.0 的仓里,牵连不到
别的文件。代价是「本仓全部 Apache-2.0」这句话不再成立 —— 第三方素材各按其条款,
逐条的记录在 `si-manifest.json` 里。

**商标另说。** 版权条目管的是图形文件,商标权归各个品牌。SI 收录时若品牌提供了使用规范,
链接也一并记下(`guidelines` 字段)。我们的用法是**指示性引用** —— 在架构图里
标出「这是哪个品牌」,不暗示背书、不改色改形。

### 没收进来的

<!-- gen:si-excluded -->
| 许可 | 原因 | 数量 | 品牌 |
| --- | --- | ---: | --- |
| custom | 条款各异 | 23 | Broadcom、Chia Network、Contentstack、Coreboot、Dify、Douban、Douban Read、Effect、FCC、Fedora、Flux、Graphite、Harbor、Kedro、Keycloak、Lemmy、MiniMax、Pleroma、Qase、Quasar、RustFS、Webex、Webpack |
| CC-BY-NC-4.0 | 禁商用 | 4 | CocoaPods、Let's Encrypt、NodeBB、RuboCop |
| CC-BY-NC-ND-4.0 | 禁商用 + 禁改 | 3 | GameBanana、PyCQA、Tauri |
| CC-BY-NC-SA-4.0 | 禁商用 + 传染 | 3 | Misskey、Robot Framework、Vue.js |
| CC-BY-ND-4.0 | 禁改 | 2 | JPEG、Slint |
| CC-BY-NC-SA-3.0 | 禁商用 + 传染 | 1 | Sass |
<!-- /gen:si-excluded -->

**禁商用**(CC-BY-NC)与本库「可商用」的承诺直接冲突,一律不收。

**禁改**(CC-BY-ND)那两条单列说明一下:

> **JPEG** 与 **Slint** —— CC-BY-ND-4.0,禁改编。我们把 SVG 压成单行、并把图标内联进
> sprite,算不算改编是个有争议的问题(CC 的 FAQ 说「单纯改格式不算演绎」,但压单行更像
> 改标记而不是改格式)。争议之下不收 —— 两个冷门图标,不值得为它们赌一次。
> 哪天有人出具明确意见,或者我们决定逐字节保留(原样镜像、不进 sprite),可以再议。
> 它们在 `si-manifest.json` 的 `excluded` 里记着,不是悄悄丢的。

**条款各异**(custom)那批,SI 自己也给不出统一的许可 —— 有的品牌(Broadcom)甚至要走
单独的 logo 申请程序。这类一律不收。

名单以 `si-manifest.json` 的 `excluded` 为准(每次同步会更新)。

### `brand:` 与 `si:` 的分工

- **`si:`** —— Simple Icons 提供的,批量。**我们不维护**,只同步。
- **`brand:`** —— SI 没有、而权利人自己在公有领域渠道上传了官方画作的
  (现在是 chatgpt / grok / openai 三个 —— OpenAI 与 ChatGPT 是同一枚标记,两个键)。

两者不重复:SI 有的品牌不在 `brand:` 里再放一份。

## 其余第三方素材

| 分类 | 来源 | 许可 | 条款原文 |
| --- | --- | --- | --- |
| `aws` `azure` `gcp` `aliyun` `oci` `ibm` | 厂商自己的官方图标包 | 原厂 SVG 原样;商标归各家 | `NOTICE.md` |
| `bootstrap` | Bootstrap Icons(整库) | 著作权 MIT | `licenses/bootstrap-icons/` |
| `iconpark` | IconPark(字节跳动,整库) | Apache-2.0 | `NOTICE.md` |
| `twemoji` `fluent` `noto` | Twemoji / Microsoft Fluent / Google Noto | MIT / MIT / OFL-1.1 | `NOTICE.md` |
| `programming` `firebase` `elastic` `digitalocean` | Simple Icons(挑出来的) | CC0-1.0 | `si-manifest.json` 同源 |
| `brand` | Wikimedia Commons(权利人自己上传的公有领域画作) | PD-simple / PD-logo(素材);商标权另论 | `NOTICE.md` |

第三方素材里画了品牌的那几十个(bootstrap 里的 alipay / github / wechat 等)同样是别人的商标:
只作指示性引用,不改色改形、不暗示背书。
