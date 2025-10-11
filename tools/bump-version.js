import { readFile, writeFile, appendFile } from 'node:fs/promises'
import path from 'node:path'

import semver from 'semver'

const packageJsonPaths = [
  path.join('package.json'),
  path.join('packages', 'contentful-content-model', 'package.json'),
  path.join('packages', 'contentful-content-model-types', 'package.json'),
]

const packageJson = JSON.parse(await readFile('package.json', 'utf-8'))
const currentVersion = packageJson.version
if (!currentVersion) {
  throw new Error('No version found in package.json')
}

const newVersion = semver.inc(currentVersion, 'patch')
if (!newVersion) {
  throw new Error(`Failed to increment version ${currentVersion} in package.json`)
}

for (const packageJsonPath of packageJsonPaths) {
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))

  packageJson.version = newVersion

  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8')
}

if (process.env.GITHUB_OUTPUT) {
  await appendFile(process.env.GITHUB_OUTPUT, `version=${newVersion}\n`, 'utf-8')
}
