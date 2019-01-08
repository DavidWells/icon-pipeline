const fs = require('fs-extra')
const path = require('path')

module.exports = function writeFile(file, contents) {
  return new Promise(async (resolve, reject) => {
    const dir = path.dirname(file)

    await fs.ensureDir(dir)

    fs.writeFile(file, contents, (error) => {
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
}