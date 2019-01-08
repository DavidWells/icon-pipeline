/*
 Optimize an array of SVG files
*/
const readFile = require('../fs/readFile')
const chalk = require('chalk')
const { basename, join } = require('path')
const optimizeSVG = require('./optimize')
const getSizeInfo = require('../utils/getSize')

module.exports = function optimizeSVGs(fileArray, outputDir) {
  return new Promise((resolve, reject) => {
    let total = 0
    const promises = fileArray.map(async (svgPath, i) => {
      let newFile
      try {
        const originalCode = await readFile(svgPath, 'utf-8')
        const originalSize = await getSizeInfo(originalCode, svgPath)
        const outputPath = join(outputDir, basename(svgPath))
        newFile = await optimizeSVG(svgPath, outputPath)

        const newSize = await getSizeInfo(newFile, outputPath)

        const savings = originalSize.gzip.size - newSize.gzip.size
        total = total + savings
        const diff = (savings > 0) ? `saved ${savings} B` : ''

        console.log(`  ┌─ ${chalk.bold(basename(svgPath))} - ${chalk.green(diff)}`)
        console.log(`  ├─ Original size: ${chalk.white(originalSize.gzip.size)}B`)
        console.log(`  └─ New size: ${chalk.green(newSize.gzip.size)}${chalk.green('B')}`)
      } catch (e) {
        console.log('e', e)
        reject(e)
      }

      return newFile
    })
    Promise.all(promises).then((data) => {
      console.log()
      const totalText = `${total}B`
      console.log(`Total savings ${chalk.green(totalText)} 🎉`)
      return resolve(data)
    })
  })
}
