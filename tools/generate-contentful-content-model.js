import { cp } from 'node:fs/promises'
import path from 'node:path'

await cp(path.join('data', 'content-model.json'), path.join('packages', 'contentful-content-model', 'content-model.json'), { force: true })
