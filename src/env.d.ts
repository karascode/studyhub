declare module 'virtual:note-sources' {
  const sources: Record<string, string>
  export default sources
}

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const meta: import('./types').NoteMeta
  const Content: ComponentType<{ components?: Record<string, unknown> }>
  export default Content
}
