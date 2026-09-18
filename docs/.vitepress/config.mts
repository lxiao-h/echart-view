import { defineConfig } from 'vitepress'
import { getBooksSidebar } from './books.mts'

export default defineConfig({
  lang: 'zh-CN',
  title: '读书笔记',
  description: '把读过的书，拆成能用的东西。',

  // 部署在 GitHub Pages 子路径，路径 = 仓库名
  base: '/echart-view/',

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '书架', link: '/books/' },
    ],

    // 侧边栏由 docs/books/ 目录自动生成：
    // 新增一本书 = 往 docs/books/ 丢一个 .md，这里无需改动
    sidebar: {
      '/books/': getBooksSidebar(),
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lxiao-h/echart-view' },
    ],

    editLink: {
      pattern: 'https://github.com/lxiao-h/echart-view/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
  },
})
