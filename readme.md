# rehype-extract-meta

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Size][size-badge]][size]

[Rehype][rehype] plugin to extract meta data from an HTML page.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

```
npm install rehype-extract-meta
```

# Use

```js
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import rehypeExtractMeta from 'rehype-extract-meta'

const processor = unified()
  .use(rehypeParse)
  .use(rehypeExtractMeta)
  .use(rehypeStringify)

const htmlString = `<html>...</html>`
const vfile = processor.processSync(htmlString)
console.log(vfile)
```

Running the above code with a valid `htmlString` will return a [VFile][vfile] containing the extracted contents in its `data` property.

```js
VFile {
  data: {
    title: '...',        // String
    date: '...',         // Date|String
    author: '...',       // String
    publisher: '...',    // String
    description: '...',  // String
    image: '...',        // URL
    keywords: ['...'],   // Array
    lang: '...',         // String
    url: '...'           // URL
  },
  messages: [],
  history: [],
  cwd: '...',
  value: '...'
}
```

# Tests

Run `npm test` to run tests.

Run `npm coverage` to produce a test coverage report.

## License

[MIT][license] © [Goran Spasojevic][author]

<!-- Definitions -->

[build-badge]: https://github.com/gorango/rehype-extract-meta/workflows/main/badge.svg
[build]: https://github.com/gorango/rehype-extract-meta/actions
[coverage-badge]: https://img.shields.io/codecov/c/github/gorango/rehype-extract-meta.svg
[coverage]: https://codecov.io/github/gorango/rehype-extract-meta
[size-badge]: https://badgen.net/packagephobia/publish/rehype-extract-meta
[size]: https://packagephobia.com/result?p=rehype-extract-meta
[rehype]: https://github.com/rehypejs/rehype
[vfile]: https://github.com/vfile/vfile
[license]: license
[author]: https://github.com/gorango
