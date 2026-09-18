# 项目长期约定

## 读书笔记站（VitePress）

- 基于 VitePress 1.6.4，源码在 `docs/`，构建产物 `docs/.vitepress/dist/`（已 gitignore）
- **新增书籍流程**：在 `docs/books/` 新建 `.md`，frontmatter 写 `title` / `category` / `order`；侧边栏由 `docs/.vitepress/books.mts` 自动扫描生成，**无需改配置**
- 书籍内容统一按「核心思想 → 关键案例 → 可执行清单」三段式整理
- 容器用法约定：`::: tip` 放启示与总纲，`::: info` 放执行清单分类，`::: warning` 放免责声明
- 部署到 GitHub Pages 子路径时，需在 `docs/.vitepress/config.mts` 打开 `base: '/echart-view/'`
- 仓库 remote：`git@github.com:lxiao-h/echart-view.git`（SSH 免密已配置）

## 用户偏好

- 分析类需求**禁止 AI 改动或落盘源码**，只做只读分析 + 方案输出
- 沟通用简体中文，风格直接、不啰嗦
