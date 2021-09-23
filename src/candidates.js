export const TITLE_CANDIDATES = [`meta[name="title"]`, `meta[property="og:title"]`, `h1[class*='title']`, 'title']

export const DATE_CANDIDATES = [
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

export const AUTHOR_CANDIDATES = [
  { type: 'article', tag: `meta[property='article:author']` },
  { type: 'twitter', tag: `meta[property='twitter:creator']` },
  { type: 'og', tag: `meta[property='og:article:author']` },
  { type: 'name', tag: `meta[name='author']` },
  { type: 'creator', tag: `meta[name='creator']` },
]

export const PUBLISHER_CANDIDATES = [
  { type: 'article', tag: `meta[property='article:publisher']` },
  { type: 'twitter', tag: `meta[property='twitter:publisher']` },
  { type: 'twitter', tag: `meta[property='twitter:site']` },
  { type: 'og', tag: `meta[property='og:site_name']` },
]

export const DESCRIPTION_CANDIDATES = [`meta[name=description]`, `meta[property='og:description']`]

export const IMAGE_CANDIDATES = [
  `meta[property='og:image']`,
  `meta[itemprop='image']`,
  `meta[name='twitter:image:src']`,
  `meta[name='twitter:image']`,
  `meta[name='twitter:image0']`,
]

export const KEYWORDS_CANDIDATES = [`meta[name='keywords']`]

export const LANG_CANDIDATES = [
  { tag: `html`, attr: 'lang' },
  { tag: `meta[name=lang]`, attr: 'content' },
  { tag: `meta[http-equiv=content-language]`, attr: 'content' },
]

export const URL_CANDIDATES = [
  { tag: `link[rel='canonical']`, attr: 'href' },
  { tag: `meta[property='og:url']`, attr: 'content' },
]

export const COPYRIGHT_CANDIDATES = [
  `p[class*='copyright']`,
  `div[class*='copyright']`,
  `span[class*='copyright']`,
  `li[class*='copyright']`,
  `p[id*='copyright']`,
  `div[id*='copyright']`,
  `span[id*='copyright']`,
  `li[id*='copyright']`,
]
