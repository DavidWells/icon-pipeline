# Icon Pipeline

> The no nonsense icon pipeline

Optimizes svg icons and creates SVG sprites for `<use>` tags

## Install

```
npm install icon-pipeline
```

## Usage

```js
// icon-tools.js
const path = require('path')
const iconPipeline = require('icon-pipeline')

const iconFolder = path.join(__dirname, 'src', 'icons')
const buildFolder = path.join(__dirname, 'build', 'icons')

const iconData = iconPipeline({
  /* Location of non optimized svg icons */
  srcDir: iconFolder,
  /* Output directory for optimized svg icons & svg sprite */
  outputDir: buildFolder,
  /* Includes the sprite.js && sprite.svg in original icon directory */
  includeSpriteInSrc: true,
  /* Turn off additional svg classes added for advanced styling */
  // disableClasses: true,
  /* Namespace of icon IDs. Will prefix icon names. Example 'foo.svg' will become 'company-foo' */
  // namespace: 'company'
})

console.log(iconData)
```
