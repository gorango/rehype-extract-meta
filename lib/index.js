import { select, selectAll } from 'hast-util-select'
import { toString } from 'hast-util-to-string'
import {
  AUTHOR_CANDIDATES, COPYRIGHT_CANDIDATES, DATE_CANDIDATES,
  DESCRIPTION_CANDIDATES, FEED_URL_CANDIDATES, IMAGE_CANDIDATES,
  KEYWORDS_CANDIDATES, LANG_CANDIDATES, PAGE_URL_CANDIDATES,
  PUBLISHER_CANDIDATES, TITLE_CANDIDATES,
} from './candidates.js'

export default function rehypeExtractMeta() {
  return function (tree, file) {
    file.data.meta = {
      lang: getValue(LANG_CANDIDATES, ['lang']) || 'en',
      pageUrl: getValue(PAGE_URL_CANDIDATES, ['href']),
      feedUrl: getValue(FEED_URL_CANDIDATES, ['href']),
      // commentsUrl: getValue(COMMENTS_URL_CANDIDATES, ['href']),
      imageUrl: getValue(IMAGE_CANDIDATES),
      title: getTitle(TITLE_CANDIDATES),
      author: getValue(AUTHOR_CANDIDATES),
      date: getValue(DATE_CANDIDATES, ['dateTime']),
      description: getValue(DESCRIPTION_CANDIDATES) || '',
      keywords: getKeywords(KEYWORDS_CANDIDATES),
      publisher: getValue(PUBLISHER_CANDIDATES),
      copyright: getValue(COPYRIGHT_CANDIDATES),
    }

    function getValue(candidates, selectors = []) {
      selectors = ['content', ...selectors]
      return candidates.reduce((found, candidate) => {
        if (found?.length)
          return found
        const node = select(candidate, tree)
        if (!node)
          return null
        const result = selectors.reduce((f, s) => f || node.properties[s], null)
        return (result?.length ? result : toString(node)).trim()
      }, null)
    }

    function getTitle(candidates) {
      const content = getValue(candidates)
      const titleDelimiters = [' | ', ' – ', ' - ', ' » ', ' : ']
      return titleDelimiters.reduce((found, delimiter) => {
        if (!found?.includes(delimiter)) {
          return found
        }
        return found.split(delimiter)[0]
      }, content) || ''
    }

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
