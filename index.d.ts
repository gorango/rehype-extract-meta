import type { Root } from 'hast'
import type { VFile } from 'vfile'

export interface Meta {
  lang?: string
  date?: string
  title?: string
  description?: string
  keywords?: string[]
  author?: string
  publisher?: string
  copyright?: string
  pageUrl?: string
  feedUrl?: string
  imageUrl?: string
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

