/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('hast').Root} Root
 */
import { select, selectAll } from 'hast-util-select'
import { toString } from 'hast-util-to-string'
import {
  AUTHOR_CANDIDATES, COPYRIGHT_CANDIDATES, DATE_CANDIDATES,
  DESCRIPTION_CANDIDATES, FEED_URL_CANDIDATES, IMAGE_CANDIDATES,
  KEYWORDS_CANDIDATES, LANG_CANDIDATES, PAGE_URL_CANDIDATES,
  PUBLISHER_CANDIDATES, TITLE_CANDIDATES,
} from './candidates.js'

/**
 * Extract meta data from HTML
 *
 * @returns transformer
 */
export default function rehypeExtractMeta() {
  /**
   * @param {Root} tree
   * @param {VFile} file
   * @returns {void} nothing
   */
  return function(tree, file) {
    file.data.meta = {
      lang: getValue(LANG_CANDIDATES, ['lang']) || 'en',
      pageUrl: getUrl(PAGE_URL_CANDIDATES, ['href']),
      feedUrl: getUrl(FEED_URL_CANDIDATES, ['href']),
      // commentsUrl: getUrl(COMMENTS_URL_CANDIDATES, ['href']),
      imageUrl: getUrl(IMAGE_CANDIDATES),
      title: getTitle(TITLE_CANDIDATES),
      author: getValue(AUTHOR_CANDIDATES),
      date: getValue(DATE_CANDIDATES, ['dateTime']),
      description: getValue(DESCRIPTION_CANDIDATES) || '',
      keywords: getKeywords(KEYWORDS_CANDIDATES),
      publisher: getValue(PUBLISHER_CANDIDATES),
      copyright: getValue(COPYRIGHT_CANDIDATES),
    }

    /**
     * @param {string[]} candidates
     * @param {string[]} [selectors]
     * @returns {string | null} value
     */
    function getValue(candidates, selectors = []) {
      selectors = ['content', ...selectors]
      return candidates.reduce(
        /**
         * @param {string | null} found
         * @param {string} candidate
         */
        (found, candidate) => {
          if (found?.length) {
            return found
          }
          const node = select(candidate, tree)
          if (!node) {
            return null
          }
          const result = selectors.reduce(
            /**
             * @param {string | null} found
             * @param {string} selector
             * @returns {string | null} value
             */
            (found, selector) =>
              // @ts-expect-error hush
              found || node.properties?.[selector], null)
          if (result?.length) {
            return result.trim()
          }
          if (candidate !== 'html') {
            return toString(node).trim()
          }
          return null
        }, null)
    }

    /**
     * @param {string[]} candidates
     * @param {string[]} [selectors]
     * @returns {string | null} url
     */
    function getUrl(candidates, selectors = ['href']) {
      let value = getValue(candidates, selectors)
      if (value && !URL.canParse(value)) {
        value = decodeURIComponent(value)
        if (!URL.canParse(value)) {
          return null
        }
      }
      return value
    }

    /**
     * @param {string[]} candidates
     * @returns {string} title
     */
    function getTitle(candidates) {
      const content = getValue(candidates)
      const titleDelimiters = [' | ', ' – ', ' - ', ' · ', ' » ', ' : ']
      return titleDelimiters.reduce((found, delimiter) => {
        if (!found?.includes(delimiter)) {
          return found
        }
        return found.split(delimiter)[0]
      }, content) || ''
    }

    /**
     * @param {string[]} candidates
     * @returns {string[] | null} keywords
     */
    function getKeywords(candidates) {
      return candidates.reduce((found, candidate) => {
        if (found) {
          return found
        }
        if (candidate === 'meta[name="keywords"]') {
          const node = select(candidate, tree)
          if (!node) {
            return null
          }
          // @ts-expect-error hush
          return node.properties?.content.split(',').map(w => w.trim())
        }
        const nodes = selectAll(candidate, tree)
        if (!nodes.length) {
          return null
        }
        return nodes.map(node => node.properties?.content || toString(node))
      }, null)
    }
  }
}
