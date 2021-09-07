const TITLE_CANDIDATES = [`meta[name="title"]`, `meta[property="og:title"]`, `h1[class*='title']`, 'title']

const DATE_CANDIDATES = [
  `meta[property='article:published_time']`,
  `meta[itemprop*='datePublished']`,
  `meta[name='date']`,
  `time[itemprop*='pubDate']`,
  `time[itemprop*='pubdate']`,
  `span[itemprop*='datePublished']`,
  `span[property*='datePublished']`,
  `p[itemprop*='datePublished']`,
  `p[property*='datePublished']`,
  `div[itemprop*='datePublished']`,
  `div[property*='datePublished']`,
  `li[itemprop*='datePublished']`,
  `li[property*='datePublished']`,
  `time`,
  `span[class*='date']`,
  `p[class*='date']`,
  `div[class*='date']`,
]

const AUTHOR_CANDIDATES = [
  { type: 'article', tag: `meta[property='article:author']` },
  { type: 'twitter', tag: `meta[property='twitter:creator']` },
  { type: 'og', tag: `meta[property='og:article:author']` },
  { type: 'name', tag: `meta[name='author']` },
  { type: 'creator', tag: `meta[name='creator']` },
]

const PUBLISHER_CANDIDATES = [
  { type: 'article', tag: `meta[property='article:publisher']` },
  { type: 'twitter', tag: `meta[property='twitter:publisher']` },
  { type: 'twitter', tag: `meta[property='twitter:site']` },
  { type: 'og', tag: `meta[property='og:site_name']` },
]

const DESCRIPTION_CANDIDATES = [`meta[name=description]`, `meta[property='og:description']`]

const IMAGE_CANDIDATES = [
  `meta[property='og:image']`,
  `meta[itemprop='image']`,
  `meta[name='twitter:image:src']`,
  `meta[name='twitter:image']`,
  `meta[name='twitter:image0']`,
]

const KEYWORDS_CANDIDATES = [`meta[name='keywords']`]

const LANG_CANDIDATES = [
  { tag: `html`, attr: 'lang' },
  { tag: `meta[name=lang]`, attr: 'content' },
  { tag: `meta[http-equiv=content-language]`, attr: 'content' },
]

const URL_CANDIDATES = [
  { tag: `link[rel='canonical']`, attr: 'href' },
  { tag: `meta[property='og:url']`, attr: 'content' },
]

const COPYRIGHT_CANDIDATES = [
  `p[class*='copyright']`,
  `div[class*='copyright']`,
  `span[class*='copyright']`,
  `li[class*='copyright']`,
  `p[id*='copyright']`,
  `div[id*='copyright']`,
  `span[id*='copyright']`,
  `li[id*='copyright']`,
]

export default {
  TITLE_CANDIDATES,
  DATE_CANDIDATES,
  AUTHOR_CANDIDATES,
  PUBLISHER_CANDIDATES,
  DESCRIPTION_CANDIDATES,
  IMAGE_CANDIDATES,
  KEYWORDS_CANDIDATES,
  LANG_CANDIDATES,
  URL_CANDIDATES,
  COPYRIGHT_CANDIDATES,
}
