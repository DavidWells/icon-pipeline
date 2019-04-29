# Icon Pipeline

> The no nonsense icon pipeline

Optimizes svg icons and creates SVG sprites for `<use>` tags.

Automatically optimize SVGs and build icon sprite for use in HTML or in JS.

## Install

```
npm install icon-pipeline
```

## Usage

See [example](/example) `make-icons.js` file

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

## How to reference sprite icons

There are a couple different ways you can reference your newly created icon sprite.

### Vanilla HTML

Include your `sprite.svg` into your DOM.

```html
<!doctype html>
<html>
  <head></head>
  <body>
    <div>Your app</div>
    <!-- Include the sprite -->
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute; width: 0; height: 0">
      <symbol viewBox="0 0 24 24" id="facebook">
        <path d="M18.768 7.465Hl.417-4z..."></path>
      </symbol>
      <symbol viewBox="0 0 24 24" id="github">
        <path d="M12 0C5.374 0 0 5.373..."></path>
      </symbol>
    </svg>
  </body>
</html>
```

### Javascript

Or include the `sprite.js` into your JS app and inject into the DOM.

```js
import sprite from './icons/sprite'
import addSVGtoDOM from './components/Icon/addSVGtoDOM'
addSVGtoDOM(null, sprite)
```

See the [example](/example) for how to use with React components.

### `use` tag

After your sprite is in the DOM, you can reference icons with the `use` tag and the ID of the icon. `#facebook` here is the name of the icon file.

```html
<svg>
  <use xlink:href="#facebook"></use>
</svg>
```

## Recommended SVG resources

- [How to work with SVG icons](https://fvsch.com/svg-icons/)
