const { resolve, relative, dirname, basename, extname, join } = require('path')
const gzipSize = require('gzip-size')
const brotliSize = require('brotli-size')
const prettyBytes = require('pretty-bytes')

function formatSize(size, filename, type, raw) {
  const pretty = raw ? `${size} B` : prettyBytes(size)
  const color = size < 5000 ? 'green' : size > 40000 ? 'red' : 'yellow'
  const MAGIC_INDENTATION = type === 'br' ? 13 : 10
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
