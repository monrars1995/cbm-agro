import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('sheet lateral', () => {
  it('permite rolagem interna quando o conteúdo ultrapassa a viewport', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/ui/sheet.tsx'), 'utf8')

    expect(source).toContain('overflow-y-auto')
  })
})
