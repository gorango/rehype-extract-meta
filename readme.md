# Rehype Extract Meta

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Size][size-badge]][size]

Extract clean meta contents from an HTML page.

## Installation

```
npm install rehype-extract-meta
```

# Usage

In your script:

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
const result = processor.processSync(htmlString)
console.log(result.data)
```

Running the above code with a valid `htmlString` will return a clean markdown containing the extracted contents from the original page.

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
[downloads-badge]: https://img.shields.io/npm/dm/rehype-extract-meta.svg
[downloads]: https://www.npmjs.com/package/rehype-extract-meta
[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-extract-meta.svg
[size]: https://bundlephobia.com/result?p=rehype-extract-meta
[license]: license
[author]: https://github.com/gorango
