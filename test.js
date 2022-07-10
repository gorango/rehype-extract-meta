import test from 'tape'
import { h } from 'hastscript'
import plugin from './src/index.js'

const process = plugin()

test('Language', t => {
  const file = { data: {} }
  const tree1 = h('html', { lang: 'en' }, [])
  const tree2 = h('html', [h('head', [h('meta', { name: 'lang', content: 'es' })])])
  const tree3 = h('html', [h('head', [h('meta', { httpEquiv: 'content-language', content: 'fr' })])])
  const tree4 = h('html', [h('head', [h('meta', { property: 'og:locale', content: 'ch' })])])
  process(tree1, file)
  t.equal('en', file.data.lang)
  process(tree2, file)
  t.equal('es', file.data.lang)
  process(tree3, file)
  t.equal('fr', file.data.lang)
  process(tree4, file)
  t.equal('ch', file.data.lang)
  t.end()
})

test('Title', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('title', 'Foo')])])
  const tree2 = h('html', [h('head', [h('meta', { name: 'title', content: 'Bar' })])])
  const tree3 = h('html', [h('head', [h('meta', { property: 'og:title', content: 'Baz' })])])
  const tree4 = h('html', [h('body', [h('h1', 'Qux')])])
  process(tree1, file)
  t.equal('Foo', file.data.title)
  process(tree2, file)
  t.equal('Bar', file.data.title)
  process(tree3, file)
  t.equal('Baz', file.data.title)
  process(tree4, file)
  t.equal('Qux', file.data.title)
  t.end()
})

test('Title delimiter', t =>  {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('title', 'Foo | Bar')])])
  const tree2 = h('html', [h('head', [h('meta', { name: 'title', content: 'Bar : Baz' })])])
  process(tree1, file)
  t.equal('Foo', file.data.title)
  process(tree2, file)
  t.equal('Bar', file.data.title)
  t.end()
})

test('URL', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('link', { rel: 'canonical', href: 'http://foobar.com' })])])
  const tree2 = h('html', [h('head', [h('meta', { property: 'og:url', content: 'http://bazqux.com' })])])
  process(tree1, file)
  t.equal('http://foobar.com', file.data.url)
  process(tree2, file)
  t.equal('http://bazqux.com', file.data.url)
  t.end()
})

test('Date', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('meta', { property: 'article:published_time', content: '2017-01-01' })])])
  const tree2 = h('html', [h('head', [h('meta', { name: 'date', content: '2017-01-02' })])])
  const tree3 = h('html', [h('body', [h('time', { datetime: '2017-01-03' })])])
  process(tree1, file)
  t.equal('2017-01-01', file.data.date)
  process(tree2, file)
  t.equal('2017-01-02', file.data.date)
  process(tree3, file)
  t.equal('2017-01-03', file.data.date)
  t.end()
})

test('Author', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('meta', { name: 'author', content: 'Foo' })])])
  const tree2 = h('html', [h('head', [h('meta', { property: 'article:author', content: 'Bar' })])])
  const tree3 = h('html', [h('head', [h('meta', { property: 'og:author', content: 'Baz' })])])
  const tree4 = h('html', [h('head', [h('meta', { name: 'twitter:creator', content: 'Qux' })])])
  process(tree1, file)
  t.equal('Foo', file.data.author)
  process(tree2, file)
  t.equal('Bar', file.data.author)
  process(tree3, file)
  t.equal('Baz', file.data.author)
  process(tree4, file)
  t.equal('Qux', file.data.author)
  t.end()
})

test('Publisher', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('meta', { name: 'publisher', content: 'Foo' })])])
  const tree2 = h('html', [h('head', [h('meta', { property: 'og:site_name', content: 'Bar' })])])
  const tree3 = h('html', [h('head', [h('meta', { property: 'article:section', content: 'Baz' })])])
  const tree4 = h('html', [h('head', [h('meta', { name: 'twitter:site', content: 'Qux' })])])
  process(tree1, file)
  t.equal('Foo', file.data.publisher)
  process(tree2, file)
  t.equal('Bar', file.data.publisher)
  process(tree3, file)
  t.equal('Baz', file.data.publisher)
  process(tree4, file)
  t.equal('Qux', file.data.publisher)
  t.end()
})

test('Description', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('meta', { name: 'description', content: 'Foo' })])])
  const tree2 = h('html', [h('head', [h('meta', { property: 'og:description', content: 'Bar' })])])
  process(tree1, file)
  t.equal('Foo', file.data.description)
  process(tree2, file)
  t.equal('Bar', file.data.description)
  t.end()
})

test('Keywords', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('meta', { name: 'keywords', content: 'Foo,Bar' })])])
  const tree2 = h('html', [h('head', [h('meta', { property: 'article:tag', content: 'Bar' }), h('meta', { property: 'article:tag', content: 'Baz' })])])
  const tree3 = h('html', [h('body', [h('a', { rel: 'tag' }, 'Baz'), h('a', { rel: 'tag' }, 'Qux')])])
  process(tree1, file)
  t.deepEqual(['Foo', 'Bar'], file.data.keywords)
  process(tree2, file)
  t.deepEqual(['Bar', 'Baz'], file.data.keywords)
  process(tree3, file)
  t.deepEqual(['Baz', 'Qux'], file.data.keywords)
  t.end()
})

test('Image', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('meta', { property: 'og:image', content: 'http://foobar.com/image.jpg' })])])
  const tree2 = h('html', [h('head', [h('meta', { itemprop: 'image', content: 'http://barbaz.com/image.jpg' })])])
  const tree3 = h('html', [h('head', [h('meta', { name: 'twitter:image', content: 'http://bazqux.com/image.jpg' })])])
  process(tree1, file)
  t.equal('http://foobar.com/image.jpg', file.data.image)
  process(tree2, file)
  t.equal('http://barbaz.com/image.jpg', file.data.image)
  process(tree3, file)
  t.equal('http://bazqux.com/image.jpg', file.data.image)
  t.end()
})

test('Copyright', t => {
  const file = { data: {} }
  const tree1 = h('html', [h('head', [h('meta', { name: 'copyright', content: 'Foo' })])])
  const tree2 = h('html', [h('body', [h('p', { class: 'copyright' }, 'Bar')])])
  const tree3 = h('html', [h('head', [h('meta', { property: 'og:site_name', content: 'Baz' })])])
  const tree4 = h('html', [h('head', [h('meta', { name: 'publisher', content: 'Qux' })])])
  process(tree1, file)
  t.equal('Foo', file.data.copyright)
  process(tree2, file)
  t.equal('Bar', file.data.copyright)
  process(tree3, file)
  t.equal('Baz', file.data.copyright)
  process(tree4, file)
  t.equal('Qux', file.data.copyright)
  t.end()
})
