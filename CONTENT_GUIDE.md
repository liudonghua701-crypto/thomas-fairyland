# Thomas Fairyland 内容维护手册

本手册用于独立增加、修改和发布网站内容。网站是纯静态项目，不需要数据库，也不需要购买服务器。

## 一、重要文件

| 文件或目录 | 用途 |
| --- | --- |
| `content.js` | 站点邮箱、双语文案、论文和照片数据 |
| `assets/photos/` | 摄影作品图片 |
| `assets/hero.webp` | 首页背景图 |
| `index.html` | 页面结构；通常不需要修改 |
| `styles.css` | 字体、颜色、排版和动效 |
| `app.js` | 筛选、语言切换和灯箱功能 |
| `.github/workflows/deploy.yml` | GitHub Pages 自动部署 |

日常增加论文和照片时，只需要修改 `content.js`，并把新图片放进 `assets/photos/`。

## 二、修改前准备

1. 打开 GitHub Desktop。
2. 确认当前仓库是 `thomas-fairyland`。
3. 点击 **Fetch origin**，确保本地内容是最新版。
4. 在 GitHub Desktop 中选择 **Repository > Show in Explorer** 打开项目目录。
5. 建议在修改前复制一份 `content.js` 作为临时备份。

不要修改 `.git/` 目录，也不要删除 `.github/workflows/deploy.yml`。

## 三、修改联系方式

打开 `content.js`，在文件开头找到：

```js
const SITE = {
  contactEmail: "liudh@iphy.ac.cn"
};
```

只替换引号中的邮箱。保存后，网页中的邮箱文字和邮件链接会同时更新。

## 四、填写自我介绍

在 `content.js` 的 `I18N` 中分别找到中文和英文的 `introduction`：

```js
zh: {
  introduction: "这里填写中文简介",
},

en: {
  introduction: "Write the English introduction here.",
},
```

当前值为空字符串 `""`，所以网站只显示联系方式。需要换行时使用 `\n`：

```js
introduction: "第一段。\n第二段。",
```

注意保留逗号、双引号和冒号。中文引号内容中不要再直接使用英文双引号；如必须使用，请写成 `\"`。

## 五、增加论文

在 `content.js` 中找到 `const PUBLICATIONS = [`。每一对 `{ ... }` 代表一篇论文。

把下面模板复制到数组最上方，并修改字段：

```js
{
  year: 2026,
  title: "Paper title",
  authors: ["First Author", "Donghua Liu", "Other Author"],
  journal: "Journal Name",
  details: "12 (3), 100-110",
  doi: "10.xxxx/example"
},
```

字段说明：

- `year`：发表年份，只写数字。
- `title`：论文英文标题。
- `authors`：作者数组，每位作者分别放在引号中。
- `journal`：期刊名称。
- `details`：卷、期、页码或文章编号。
- `doi`：只写 DOI，不要加 `https://doi.org/`。

网站会自动突出显示作者列表中的 `Donghua Liu`，并根据 `year` 生成年份筛选结果。若新增了网站尚未提供的年份，需要同时在 `index.html` 的 `.research-toolbar` 中复制一个年份按钮。

## 六、准备新照片

不要直接上传几十 MB 的扫描原图。建议最长边不超过 2000 像素，单张尽量低于 1.5 MB。

项目提供了照片预处理脚本。在项目目录空白处按住 Shift 并右键，选择“在终端中打开”，运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\prepare-photo.ps1 `
  -InputPath "D:\照片\原图.jpg" `
  -OutputName "film-roll-08-001"
```

脚本会：

- 保留原始照片不变；
- 把最长边缩小到 2000 像素；
- 输出 JPEG 到 `assets/photos/film-roll-08-001.jpg`；
- 使用适合网页的压缩质量。

文件名建议只用小写英文字母、数字和连字符，不使用空格或中文，例如 `beijing-2026-001.jpg`。

## 七、增加胶片摄影作品

在 `content.js` 中找到 `const PHOTOS = [`，复制一条现有记录并修改：

```js
{
  file: "film-roll-08-001.jpg",
  type: "film",
  camera: "YASHICA Electro 35",
  film: "CN400 PROMAX",
  orientation: "landscape"
},
```

字段说明：

- `file`：必须与 `assets/photos/` 中的文件名完全一致，包括扩展名。
- `type`：胶片照片固定写 `"film"`。
- `camera`：相机型号；相同型号必须保持拼写完全一致。
- `film`：胶卷型号；相同胶卷必须保持拼写完全一致。
- `orientation`：横图写 `"landscape"`，竖图写 `"portrait"`。
- `featured: true`：可选，仅建议给画廊第一张重点图片使用。

相机和胶卷筛选按钮会根据 `camera` 与 `film` 自动生成，不需要修改 HTML。

## 八、增加数码摄影作品

数码照片不需要 `film` 字段：

```js
{
  file: "digital-2026-001.jpg",
  type: "digital",
  camera: "SONY A7 IV",
  orientation: "landscape"
},
```

保存后，该照片会自动出现在“数码摄影”模块，并生成对应相机筛选按钮。

## 九、删除或调整照片顺序

- 删除照片：从 `PHOTOS` 数组中删除对应的完整 `{ ... }` 记录。确认网站正常后，再删除 `assets/photos/` 中的图片文件。
- 调整顺序：在 `PHOTOS` 数组中移动完整记录。越靠前越先显示。
- 不要只删除一半记录，否则会造成 JavaScript 语法错误。

## 十、更换首页图片

1. 把新图片裁切或缩放为横向图片，建议宽度 2000-2400 像素。
2. 将图片转换为 WebP，并命名为 `hero.webp`。
3. 替换 `assets/hero.webp`。
4. 在 `index.html` 中更新 `.hero-image` 的 `alt` 文字，简要描述画面内容。

首页雾面效果由 `styles.css` 中的 `.hero-image` 和 `.hero-shade` 控制。

## 十一、本地预览

最简单的方法是双击 `index.html`。如果浏览器限制本地脚本，可使用本地服务器。

安装了 Python 时，在项目目录运行：

```powershell
python -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173
```

预览时至少检查：

1. 中英文切换是否正常。
2. 新论文的 DOI 是否打开正确页面。
3. 胶片与数码分类是否正确。
4. 相机、胶卷筛选是否正确。
5. 新图片是否能在灯箱中打开。
6. 手机窗口宽度下是否存在横向滚动。

## 十二、使用 GitHub Desktop 发布

1. 打开 GitHub Desktop，选择 `thomas-fairyland`。
2. 左侧确认修改文件符合预期，不要提交临时文件或原始大图。
3. 在左下角 Summary 填写更新说明，例如 `Add new film photographs`。
4. 点击 **Commit to main**。
5. 点击顶部 **Push origin**。
6. 打开仓库的 **Actions** 页面，等待 `Deploy static site to GitHub Pages` 显示绿色勾号。

发布网址：

```text
https://liudonghua701-crypto.github.io/thomas-fairyland/
```

通常几分钟内更新。浏览器仍显示旧内容时，按 `Ctrl + F5` 强制刷新。

## 十三、常见问题

### 页面完全空白

通常是 `content.js` 缺少逗号、引号或括号。用文本编辑器撤销最后一次修改，并逐条重新添加。

### 图片不显示

检查 `file` 是否与实际文件名完全一致。GitHub 区分大小写，例如 `Photo.jpg` 和 `photo.jpg` 是两个文件。

### 筛选中出现两个看似相同的相机

通常是拼写或空格不同。统一所有记录中的 `camera` 字段。

### GitHub Pages 部署失败

打开 Actions 中失败的运行记录，查看红色步骤。若 `Configure Pages` 失败，检查 **Settings > Pages > Source** 是否为 **GitHub Actions**。

### 修改后网站没有变化

确认已经执行 **Commit to main** 和 **Push origin**，并确认 Actions 部署成功。随后使用 `Ctrl + F5` 刷新。

## 十四、恢复错误修改

若尚未提交，在 GitHub Desktop 中右键文件并选择 **Discard changes**。这会永久丢弃该文件尚未提交的修改，应先确认。

若已经提交但尚未推送，可以在 GitHub Desktop 的 History 中找到上一个正常提交并检查差异。若已经推送，优先创建一个新提交修复问题，不要使用强制推送。
