import {defaultArgs, runBrowser} from "../src"
import {promises} from "fs"

async function main() {
    const outputDirectory = "./output"
    await promises.rm(outputDirectory, { recursive: true, force: true })
    await promises.mkdir(outputDirectory)
    await runBrowser({
        ...defaultArgs,
        url: 'https://arweave.org/',
        browserExecutablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        output: `${outputDirectory}/index.html`,
        basePath: outputDirectory
    })
    const files = await promises.readdir(outputDirectory)
    await promises.rm(outputDirectory, { recursive: true, force: true })
    if (files.length === 3) {
        console.log("Test Passed!");
    } else {
        throw new Error("Test Failed!")
    }
}

main()