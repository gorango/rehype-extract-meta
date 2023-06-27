export const LANG_CANDIDATES = [
  'html',
  'meta[name="lang"]',
  'meta[http-equiv="content-language"]',
  'meta[property="og:locale"]',
]

export const TITLE_CANDIDATES = [
  'title',
  'meta[name="title"]',
  'meta[property="og:title"]',
  'h1',
]

export const DESCRIPTION_CANDIDATES = [
  'meta[name=description]',
  'meta[property="og:description"]'
]

export const PUBLISHER_CANDIDATES = [
  'meta[name=publisher]',
  'meta[property="og:site_name"]',
  'meta[property="article:section"]',
  'meta[name="twitter:site"]',
  'meta[property="twitter:site"]',
]

export const AUTHOR_CANDIDATES = [
  'meta[name="author"]',
  'meta[property="og:author"]',
  'meta[property="article:author"]',
  'meta[name="twitter:creator"]',
  'meta[property="twitter:creator"]',
]

export const COPYRIGHT_CANDIDATES = [
  'meta[name="copyright"]',
  'p[class*="copyright"]',
  'div[class*="copyright"]',
  'span[class*="copyright"]',
  'li[class*="copyright"]',
  ...PUBLISHER_CANDIDATES,
]

export const KEYWORDS_CANDIDATES = [
  'meta[name="keywords"]',
  'meta[property="article:tag"]',
  'a[rel="tag"]',
]

export const DATE_CANDIDATES = [
  'meta[property="article:published_time"]',
  'meta[name="date"]',
  'time',
]

export const PAGE_URL_CANDIDATES = [
  'link[rel="canonical"]',
  'meta[property="og:url"]',
]

export const ALT_URL_CANDIDATES = [
  'link[rel="alternate"]',
  'link[type="application/rss+xml"]',
  'link[type="application/atom+xml"]',
  'link[type="application/json"]',
  'meta[property="og:alternate"]',
]

export const IMAGE_URL_CANDIDATES = [
  'meta[property="og:image"]',
  'meta[itemprop="image"]',
  'meta[name="twitter:image:src"]',
  'meta[name="twitter:image"]',
  'meta[name="twitter:image0"]'
]
