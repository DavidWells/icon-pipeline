const fs = require('fs')

module.exports = function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        return reject(error)
      }
      return resolve(files)
    })
  })
}
