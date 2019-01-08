/*
 Optimize an SVG file
*/
const fs = require('fs-extra')
const path = require('path')
const SVGO = require('svgo')
const writeFile = require('../fs/writeFile')
const readFile = require('../fs/readFile')
const getSVGOConfig = require('./config')

module.exports = function optimizeSVG(svgPath, outputDir) {
  return new Promise(async (resolve, reject) => {
    const svgContents = await readFile(svgPath)
    const name = path.basename(svgPath)
    const SVGOSettings = getSVGOConfig(`svg-${name.replace('.svg', '')}`)
    const svgo = new SVGO(SVGOSettings)
    svgo.optimize(svgContents, async (result) => {
      const outputPath = path.join(outputDir, name)
      try {
        await writeFile(outputPath, result.data)
      } catch(error) {
        return reject(error)
      }
      return resolve(result.data)
    })
  })
}