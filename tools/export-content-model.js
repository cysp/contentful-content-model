import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { stringify } from 'canonical-json'
import contentfulExport from 'contentful-export'

const managementToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
if (!managementToken) {
  throw new Error('CONTENTFUL_MANAGEMENT_ACCESS_TOKEN env var is required!')
}

const spaceId = process.env.CONTENTFUL_SPACE_ID
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID

if (!spaceId) {
  throw new Error('CONTENTFUL_SPACE_ID env var is required!')
}

const data = await contentfulExport({
  spaceId,
  environmentId,
  managementToken,
  downloadAssets: false,
  saveFile: false,
  skipAssets: true,
  skipContent: true,
  skipRoles: true,
  skipWebhooks: true,
  useVerboseRenderer: true,
})

await rm('data', { recursive: true, force: true })

await mkdir('data', { recursive: true })

await writeFile(path.join('data', 'content-model.json'), stringify(data, undefined, 2))

await mkdir(path.join('data', 'content-model', 'content-types'), { recursive: true })

for (const contentType of data.contentTypes) {
  const fileName = `${contentType.sys.id}.json`
  await writeFile(path.join('data', 'content-model', 'content-types', fileName), stringify(contentType, undefined, 2))
}

await mkdir(path.join('data', 'content-model', 'editor-interfaces'), { recursive: true })

for (const editorInterface of data.editorInterfaces) {
  const fileName = `${editorInterface.sys.contentType.sys.id}.json`
  await writeFile(path.join('data', 'content-model', 'editor-interfaces', fileName), stringify(editorInterface, undefined, 2))
}

await mkdir(path.join('data', 'content-model', 'locales'), { recursive: true })

for (const locale of data.locales) {
  const fileName = `${locale.code}.json`
  await writeFile(path.join('data', 'content-model', 'locales', fileName), stringify(locale, undefined, 2))
}
