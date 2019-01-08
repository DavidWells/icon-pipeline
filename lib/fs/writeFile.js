const fs = require('fs-extra')
const path = require('path')

module.exports = function writeFile(file, contents) {
  return new Promise(async (resolve, reject) => {
    ensureDirectoryExists(file)
    // fs-extra doesnt work? await fs.ensureDir(dir)

    fs.writeFile(file, contents, (error) => {
      if (error) {
        console.log('ere is error', error)
        return reject(error)
      }
      return resolve()
    })
  })
}

function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExists(dirname)
  fs.mkdirSync(dirname)
}
