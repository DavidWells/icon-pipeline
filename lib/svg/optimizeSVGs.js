/*
 Optimize an array of SVG files
*/
const optimizeSVG = require('./optimize')

module.exports = function optimizeSVGs(fileArray, outputDir) {
  return new Promise((resolve, reject) => {
    const promises = fileArray.map((svgPath) => {
      return optimizeSVG(svgPath, outputDir)
    })
    Promise.all(promises).then((data) => {
      return resolve(data)
    })
  })
}