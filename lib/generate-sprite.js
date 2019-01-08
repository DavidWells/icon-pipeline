const fs = require('fs-extra')
const path = require('path')
const parse = require('htmlparser2')
const pug = require('pug')
const filter = require('lodash.filter')
const writeFile = require('./fs/writeFile')

const spriteTemplate = path.join(__dirname, 'templates', 'layout.pug')

module.exports = function buildSprite(files, config = {}) {
  const { srcDir, outputDir, namespace, includeSpriteInSrc } = config
  const iconNameSpace = (namespace) ? `${namespace.replace(/-$/, '')}-` : ''
  if (!srcDir || !outputDir) {
    throw new Error('Missing srcDir or outputDir')
  }
  return new Promise(async (resolve, reject) => {
    const data = {
      svg: {
        xmlns: 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        style: 'position:absolute; width: 0; height: 0'
      },
      defs: [],
      symbols: []
    }
    // each over files
    files.forEach(async (fpath) => {
      // load and minify
      const buffer = fs.readFileSync(fpath, 'utf8')
      // get filename for id generation
      const filename = path.basename(fpath, '.svg')
      const handler = new parse.DomHandler((e, dom) => {
        if (e) {
          return reject(e)
        }
        parseDomObject(data, filename, dom, iconNameSpace)
      })

      // lets create parser instance
      const Parser = new parse.Parser(handler, {
        xmlMode: true
      })
      Parser.write(buffer)
      Parser.end()
    })
    // console.log('Final', data)
    const spriteContents = createSprite(data)
    const spriteContentsJS = createSpriteJS(spriteContents)

    let svgFilesToWrite = [
      path.join(outputDir, 'sprite.svg'),
    ]
    let jsFilesToWrite = [
      path.join(outputDir, 'sprite.js'),
    ]

    if (includeSpriteInSrc) {
      jsFilesToWrite = jsFilesToWrite.concat(
        [ path.join(srcDir, 'sprite.js') ]
      )
      svgFilesToWrite = svgFilesToWrite.concat(
        [ path.join(srcDir, 'sprite.svg') ]
      )
    }

    try {

      const svgFiles = svgFilesToWrite.map((filePath) => {
        return writeFile(filePath, spriteContents)
      })

      const jsFiles = jsFilesToWrite.map((filePath) => {
        return writeFile(filePath, spriteContentsJS)
      })

      const promises = svgFiles.concat(jsFiles)

      const allFiles = svgFilesToWrite.concat(jsFilesToWrite)

      Promise.all(promises).then(() => {
        return resolve(allFiles)
      })

    } catch (error) {
      return reject(error)
    }
  })
}

function createSprite(data) {
  return pug.renderFile(spriteTemplate, data)
}

function createSpriteJS(spriteContents) {
  const prefix = 'module.exports =  \`'
  const postfix = '\`;\n'
  return prefix + spriteContents + postfix
}

function parseDomObject(data, filename, dom, prefix) {
  const id = convertFilenameToId(filename)
  if (dom && dom[0]) {
    defs(id, dom[0], data.defs)
    symbols(id, dom[0], data.symbols, prefix)
  }

  return data
}

function convertFilenameToId(filename) {
  let _name = filename
  const dotPos = filename.indexOf('.')
  if (dotPos > -1) {
    _name = filename.substring(0, dotPos)
  }
  return _name
}

function defs(id, dom, data) {
  // lets find defs into dom
  const defs = filter(dom.children, { name: 'defs' })
  // check childrens
  defs.forEach((item) => {
    if (item.children && item.children.length > 0) {
      // mutable attribute
      item.children.forEach((_data) => {
        _data.attribs.id = [id, _data.attribs.id || 'icon-id'].join('-')
        data.push(_data)
      })
    }
  })

  return data
}

function symbols(id, dom, data, prefix) {
  // create symbol object
  const symbol = {
    type: 'tag',
    name: 'symbol',
    attribs: {
      viewBox: dom.attribs.viewBox,
      id: prefix + id,
      class: dom.attribs.class,
    },
    next: null,
    prev: null,
    parent: null
  }

  // add dom children without defs and titles
  symbol.children = filter(dom.children, (obj) => {
    return obj.name !== 'defs' && obj.name !== 'title'
  })

  // go through the svg element
  parseSVG(symbol.children, id)

  // push symbol data
  data.push(symbol)

  return data
}

function parseSVG(arr, id) {
  const data = []
  arr.forEach((obj, i) => {
    if (obj) {
      // console.log('obj', obj)
      // add unic ids to urls
      fixUrls(obj, id)
      // add ids
      fixIds(obj, id)
      // add classes for customization
      addPathClasses(obj, id, i)
      // go deeper if children exists
      if (obj.children && obj.children.length > 0) {
        parseSVG(obj.children, id)
      }
      data.push(obj, id)
    }
  })

  return data
}

function addPathClasses(obj, id, i) {
  var hasClass = (obj.attribs.class) ? `${obj.attribs.class} ` : ''
  if (obj.name === 'path') {
    obj.attribs.class = `${hasClass + id}-path-${i}`
  }
  if (obj.name === 'circle') {
    var hasClass = (obj.attribs.class) ? `${obj.attribs.class} ` : ''
    obj.attribs.class = `${hasClass + id}-circle-${i}`
  }
}

function fixUrls(obj, id) {
  let key
  let match
  const json = obj.attribs
  if (json) {
    for (key in json) {
      if (json.hasOwnProperty(key)) {
        match = /url\(\s*#([^ ]+?)\s*\)/g.exec(json[key])
        if (key && match) {
          json[key] = `url(#${id}-${match[1]})`
        }
      }
    }
  }
}

function fixIds(obj, id) {
  // add id
  if (obj.attribs && obj.attribs.id) {
    obj.attribs.id = [id, obj.attribs.id].join('-')
  }
  // add id to use tag
  if (obj.name === 'use') {
    obj.attribs['xlink:href'] = [`#${id}`, obj.attribs['xlink:href'].replace('#', '')].join('-')
  }
}
