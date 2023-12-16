/*
 Optimize an array of SVG files
*/
const readFile = require('../fs/readFile')
const chalk = require('chalk')
const { basename, join } = require('path')
const optimizeSVG = require('./optimize')
const getSizeInfo = require('../utils/getSize')

function whiteBold(text) {
  return chalk.whiteBright.bold(text)
}

module.exports = function optimizeSVGs(fileArray, outputDir) {
  return new Promise((resolve, reject) => {
    let total = 0
    const promises = fileArray.map(async (svgPath, i) => {
      let newFile
      try {
        const originalCode = await readFile(svgPath, 'utf-8')
        if (!originalCode) {
          console.log(`Warning ${svgPath} is an empty file. Double check that icon`)
          return
        }
        const originalSize = await getSizeInfo(originalCode, svgPath)
        const outputPath = join(outputDir, basename(svgPath))
        newFile = await optimizeSVG(svgPath, outputPath)

        const newSize = await getSizeInfo(newFile, outputPath)

        const savings = originalSize.gzip.size - newSize.gzip.size
        total = total + savings
        const diff = (savings > 0) ? `${savings}B` : ''

        console.log(`  ┌─ ${chalk.bold(basename(svgPath))}`)
        console.log(`  ├─ Original size:  ${whiteBold(originalSize.gzip.size)}${whiteBold('B')}`)
        console.log(`  ├─ New size:       ${whiteBold(newSize.gzip.size)}${whiteBold('B')}`)
        console.log(`  └─ Savings:        ${chalk.greenBright.bold(diff)}`)
      } catch (e) {
        console.log('e', e)
        reject(e)
      }

      return newFile
    })
    Promise.all(promises).then((data) => {
      console.log()
      const totalText = `${total}B`
      console.log(`Total file size savings ${chalk.greenBright.bold(totalText)} 🎉`)
      return resolve(data)
    })
  })
}
