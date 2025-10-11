import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { CFDefinitionsBuilder, V10ContentTypeRenderer, V10TypeGuardRenderer } from 'cf-content-types-generator'

import contentModel from '../data/content-model.json' with { type: 'json' }

const contentTypesById = new Map(contentModel.contentTypes.map((ct) => [ct.sys.id, ct]))
const editorInterfacesByContentTypeId = new Map(
  contentModel.editorInterfaces.map((ei) => [ei.sys.contentType.sys.id, ei]),
)

let builder = new CFDefinitionsBuilder([
  new V10ContentTypeRenderer(),
  new V10TypeGuardRenderer(),
])

for (const [id, contentType] of contentTypesById) {
  builder = builder.appendType(contentType, editorInterfacesByContentTypeId.get(id))
}

await rm(path.join('packages', 'contentful-content-model-types', 'src', '__generated__'), { recursive: true, force: true })

await mkdir(path.join('packages', 'contentful-content-model-types', 'src', '__generated__'), { recursive: true })

await builder.write(path.join('packages', 'contentful-content-model-types', 'src', '__generated__'), async (filePath, content) => {
  await writeFile(filePath, content)
})
