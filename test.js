import fs from 'fs'
import path from 'path'
import test from 'tape'
import { unified } from 'unified'
import parseHtml from 'rehype-parse'
import stringifyHtml from 'rehype-stringify'

import plugin from './src/index.js'

const processor = unified()
  .use(parseHtml)
  .use(stringifyHtml)
  .use(plugin)

test('Fixtures', function(t) {
  const root = path.join(process.cwd(), 'fixtures')

  fs.readdirSync(root)
    .forEach(function(fixture) {
      const input = path.join(root, fixture, 'input.html')
      const output = path.join(root, fixture, 'output.json')
      const file = fs.readFileSync(input)
      const { data: actual } = processor.processSync(file)
      let expected

      try {
        expected = JSON.parse(fs.readFileSync(output))
      } catch (error) {
        fs.writeFileSync(output, JSON.stringify(actual, null, 2) + '\n')
        return
      }

      t.deepEqual(actual, expected, 'should work on `' + fixture + '`')
    })

  t.end()
})

