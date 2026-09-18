import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const BOOKS_DIR = path.resolve(HERE, '../books')

/** 每本书的元信息，取自 md 文件顶部的 frontmatter */
export interface BookEntry {
  /** 侧边栏显示的书名 */
  text: string
  /** 路由链接 */
  link: string
  /** 分组名，用于侧边栏归类 */
  category: string
  /** 组内排序，数字越小越靠前 */
  order: number
}

/** 只挑出我们关心的几个标量字段，避免为读 frontmatter 引入额外依赖 */
function readFrontmatter(file: string): Record<string, string> {
  const raw = fs.readFileSync(file, 'utf-8')
  const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const meta: Record<string, string> = {}
  if (!block) return meta
  for (const line of block[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.+)$/)
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return meta
}

/**
 * 扫描 docs/books/ 下的所有 md（index.md 除外），
 * 读取 frontmatter 得到书名 / 分类 / 排序。
 * 新增一本书 = 往 docs/books/ 丢一个 md 文件，无需改动本配置。
 */
export function getBookEntries(): BookEntry[] {
  if (!fs.existsSync(BOOKS_DIR)) return []

  return fs
    .readdirSync(BOOKS_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => {
      const slug = f.replace(/\.md$/, '')
      const meta = readFrontmatter(path.join(BOOKS_DIR, f))
      return {
        text: meta.title || slug,
        link: `/books/${slug}`,
        category: meta.category || '未分类',
        order: Number(meta.order) || 999,
      }
    })
}

/** 按 category 分组，组内按 order 升序；分组顺序取组内最小 order */
export function getBooksSidebar(): DefaultTheme.SidebarItem[] {
  const entries = getBookEntries()
  const grouped = new Map<string, BookEntry[]>()

  for (const e of entries) {
    if (!grouped.has(e.category)) grouped.set(e.category, [])
    grouped.get(e.category)!.push(e)
  }

  return [...grouped.entries()]
    .map(([category, items]) => {
      items.sort((a, b) => a.order - b.order || a.text.localeCompare(b.text, 'zh-CN'))
      return {
        text: category,
        minOrder: Math.min(...items.map((i) => i.order)),
        collapsed: false,
        items: items.map((i) => ({ text: i.text, link: i.link })),
      }
    })
    .sort((a, b) => a.minOrder - b.minOrder)
    .map(({ text, collapsed, items }) => ({ text, collapsed, items }))
}
