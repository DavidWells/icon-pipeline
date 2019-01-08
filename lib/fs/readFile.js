const fs = require('fs')

module.exports = function readFile(file, contents) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, contents) => {
      if (error) {
        return reject(error)
      }
      return resolve(contents)
    })
  })
}
