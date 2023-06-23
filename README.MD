# @pawanpaudel93/single-file

```ts
import {saveSingleFile} from "../src/index"
import {promises} from "fs"
import { findChrome } from 'find-chrome-bin'
import { BrowserFetcher } from 'puppeteer-core'
import { join } from 'path'
import { homedir } from 'os'

const main = async () => {
  const outputDirectory = "./output"
  await promises.mkdir(outputDirectory)
  const chromePath = join(homedir(), '.cache', 'puppeteer')
  const { executablePath } = await findChrome({
    download: {
      puppeteer: { BrowserFetcher },
      path: chromePath,
      revision: '1095492',
    },
  })
  await saveSingleFile({
      url: 'https://arweave.org/',
      browserExecutablePath: executablePath,
      output: `${outputDirectory}/index.html`,
      basePath: outputDirectory
  })
  const files = await promises.readdir(outputDirectory)
  console.log(files)
}

main()
```
