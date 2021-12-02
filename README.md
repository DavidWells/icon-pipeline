# Icon Pipeline

> The no nonsense icon pipeline

Optimizes svg icons and creates SVG sprites for `<use>` tags.

Automatically optimize SVGs and build icon sprite for use in HTML or in JS.

## Install

```
npm install icon-pipeline
```

## Usage

Include `icon-pipeline` as a dev dependency and call it during your build process.

Here is an example:

```js
const path = require('path')
const iconPipeline = require('icon-pipeline')

const iconSrcFolder = path.join(__dirname, 'src', 'icons')
const iconOutputFolder = path.join(__dirname, 'build', 'icons')

/* Generate optimized SVGs and icon sprite */
iconPipeline({
  // Location of non optimized svg icons
  srcDir: iconSrcFolder,
  // Output directory for optimized svg icons & svg sprite
  outputDir: iconOutputFolder,
  // Includes the sprite.js && sprite.svg in original icon directory
  includeSpriteInSrc: true,
  // Turn off additional svg classes added for advanced styling
  /* disableClasses: true, */
  // Namespace of icon IDs. Will prefix icon names. Example 'foo.svg' will become 'company-foo'
  /* namespace: 'company' */
}).then((iconData) => {
  console.log('iconData', iconData)
})

console.log(iconData)
```

See [`make-icons.js` file](/example) for a working example of this.

### Input

So for example, the src directory (**srcDir**) of unoptimized SVG icons looks like:

```
src/icons/
├── profile.svg
├── github.svg
└── facebook.svg
```

### Output 

The output directory (**outputDir**) of icons will result in:

```
build/icons/
├── sprite.svg     <-- SVG sprite for usage in HTML
├── sprite.js      <-- SVG sprite for usage in javascript
├── icon-list.js   <-- manifest of all available icons
├── profile.svg    <-- optimized svg
├── github.svg     <-- optimized svg
└── facebook.svg   <-- optimized svg
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

## Alt packages

- https://github.com/svg-sprite/svg-sprite
- https://github.com/kreuzerk/svg-to-ts
