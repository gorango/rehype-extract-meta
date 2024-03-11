import type { Root } from 'hast'
import type { VFile } from 'vfile'

export interface Meta {
  lang: string
  pageUrl?: string | null
  feedUrl?: string | null
  imageUrl?: string | null
  title: string
  author?: string | null
  date?: string | null
  description?: string | null
  keywords: string[] | null
  publisher?: string | null
  copyright?: string | null
}

/**
 * Extract meta data from HTML
 *
 * @returns transformer
 */
export default function rehypeExtractMeta(): (tree: Root, file: VFile) => void

declare module 'vfile' {
  interface DataMap {
    /**
     * The extracted meta data.
     *
     * Populated by `rehype-extract-meta`
     */
    meta: Meta
  }
}

