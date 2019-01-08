/**
 * Script to generate the sprite of icons included in project
 */
const writeFile = require('./fs/writeFile')

module.exports = function makeIconList(icons, outputFilePath) {
  return new Promise(async (resolve, reject) => {
    const iconMap = icons.reduce((list, icon) => {
      const name = icon.replace('.svg', '')
      list[name] = {
        filename: icon,
        // cdnLink: ""
      }
      return list
    }, {})

    // File contents
    const iconExports = `/* auto generated list of available icons */
module.exports = ${JSON.stringify(iconMap, null, 2)}`

    try {
      await writeFile(outputFilePath, iconExports)
    } catch (error) {
      return reject(error)
    }
    return resolve(iconMap)
  })
}
