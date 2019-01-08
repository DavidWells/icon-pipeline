const fs = require('fs-extra')
const readDir = require('../fs/readDir')
const readFile = require('../fs/readFile')
const writeFile = require('../fs/writeFile')
const path = require('path')

module.exports = function renameSVGClasses(files) {
  return new Promise((resolve, reject) => {
    const outputFiles = files.map(async (file, i) => {
      const name = path.basename(file, '.svg')
      try {
        const contents = await readFile(file)
        const matches = contents.match(/class="(.?)"/g)
        if (matches) {
          for (let n = 0; n < matches.length; n++) {
            const className = matches[n].replace('class=', '').replace(/"/g, '')
            const find = `class="${className}"`
            const replace = `class="${name}-${className}"`
            contents = contents.replace(find, replace)
            const findStyle = `.${className}`
            const replaceStyle = `.${name}-${className}`
            contents = contents.replace(findStyle, replaceStyle)
          }
        }
        await writeFile(file, contents)
      } catch (e) {
        return reject(e)
      }
      return file
    })

    Promise.all(outputFiles).then((d) => {
      return resolve(d)
    })
  })
}
