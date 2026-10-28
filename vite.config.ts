import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Serves the raw text of every note (for search indexing); `?raw` would return compiled MDX instead. */
function noteSources(): Plugin {
  const id = 'virtual:note-sources'
  const root = path.resolve(__dirname, 'src/content')
  return {
    name: 'note-sources',
    resolveId: (s) => (s === id ? '\0' + id : undefined),
    load(this, rid) {
      if (rid !== '\0' + id) return
      const out: Record<string, string> = {}
      for (const subject of fs.readdirSync(root, { withFileTypes: true })) {
        const dir = path.join(root, subject.name, 'notes')
        if (!subject.isDirectory() || !fs.existsSync(dir)) continue
        for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.mdx'))) {
          const full = path.join(dir, f)
          this.addWatchFile(full)
          out[`./${subject.name}/notes/${f}`] = fs.readFileSync(full, 'utf8')
        }
      }
      return `export default ${JSON.stringify(out)}`
    },
  }
}

export default defineConfig({
  // GitHub Pages serves from /<repo>/; the deploy workflow sets BASE_PATH. Root hosts use '/'.
  base: process.env.BASE_PATH ?? '/',
  plugins: [
    noteSources(),
    { enforce: 'pre', ...mdx({ include: /\.mdx$/, remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex] }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    VitePWA({
      disable: !!process.env.NO_PWA,
      registerType: 'autoUpdate',
      workbox: { mode: 'development', sourcemap: false, globPatterns: ['**/*.{js,css,html,woff2,svg,png}'], maximumFileSizeToCacheInBytes: 6_000_000 },
      manifest: {
        name: 'StudyHub',
        short_name: 'StudyHub',
        description: 'Offline revision for IGCSE Physics and Mathematics',
        theme_color: '#18181b',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
    }),
  ],
})
