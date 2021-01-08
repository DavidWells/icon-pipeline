const gzipSize = require('gzip-size')
const brotliSize = require('brotli-size').default
const prettyBytes = require('pretty-bytes')

function formatSize(size, filename, type, raw) {
  const pretty = raw ? `${size} B` : prettyBytes(size)
  return {
    size: size,
    pretty: pretty,
    type: type
  }
}

module.exports = async function getSizeInfo(code, filename) {
  const raw = code.length < 5000
  const gzip = formatSize(await gzipSize(code), filename, 'gzip', raw)
  const brotli = formatSize(await brotliSize(code), filename, 'br', raw)
  return {
    gzip,
    brotli
  }
}
