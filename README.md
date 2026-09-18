# echart-view

用 VitePress 搭建的读书笔记站点。每本书都按 **核心思想 → 关键案例 → 可执行清单** 的结构整理，目标是读完能照着做。

## 快速开始

```bash
npm install            # 首次运行，安装依赖
npm run docs:dev       # 本地开发，默认 http://localhost:5173
npm run docs:build     # 构建到 docs/.vitepress/dist
npm run docs:preview   # 预览构建产物
```

## 新增一本书

只有两步，**侧边栏会自动收录，不需要改任何配置**。

**1. 在 `docs/books/` 下新建一个 `.md` 文件**，顶部写上 frontmatter：

````yaml
---
title: 《书名》        # 侧边栏和页面里显示的名字
category: 经济与金融    # 分组名，同组的书自动归到一起
order: 2              # 组内排序，数字越小越靠前
description: 一句话简介
---
````

**2. 正文正常写 markdown 即可**，推荐用 VitePress 内置容器来保留层次：

```md
::: tip 核心观点
强调性的结论
:::

::: warning 注意
风险提示
:::
```

如果想让新书出现在「书架」总览页，再去 `docs/books/index.md` 里补一行链接。

> 排序规则：分组按组内最小 `order` 排列，组内的书按 `order` 升序；没写 `order` 的默认排到 999。

## 目录结构

```
docs/
├── .vitepress/
│   ├── config.mts       # 站点配置：导航、主题、搜索
│   └── books.mts        # 侧边栏自动生成器：扫描 docs/books/
├── index.md             # 首页
└── books/
    ├── index.md         # 书架总览
    └── 小岛经济学.md      # 一本书 = 一个 md 文件
```

## 部署到 GitHub Pages

站点默认按根路径构建。若要部署到 `https://<用户名>.github.io/echart-view/`，需要打开 `docs/.vitepress/config.mts` 里这一行：

```ts
base: '/echart-view/',
```

## 说明

- `小岛经济.html` 是最初的单文件版本，内容已完整迁移到 `docs/books/小岛经济学.md`，暂保留作存档。
- `docs/.vitepress/dist/` 与 `docs/.vitepress/cache/` 是构建产物，已在 `.gitignore` 中忽略。
