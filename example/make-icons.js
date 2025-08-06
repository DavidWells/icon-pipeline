const fs = require('fs')
const path = require('path')
const iconPipeline = require('../lib/index')

const iconFolder = path.join(__dirname, 'src', 'icons')
const buildFolder = path.join(__dirname, 'build', 'icons')

async function makeIcons() {
	let iconData
	try {
		iconData = await iconPipeline({
			/* Location of non optimized svg icons */
			srcDir: iconFolder,
			/* Output directory for optimized svg icons & svg sprite */
			outputDir: buildFolder,
			/* Includes the sprite.js && sprite.svg in original icon directory */
			includeSpriteInSrc: true,
			/* Turn off additional svg classes added for advanced styling */
			// disableClasses: true,
			/* Namespace of icon IDs. Will prefix icon names. Example 'foo.svg' will become 'company-foo' */
			// namespace: 'company',
			/* Use ESM syntax */
			isESM: true
		})
	} catch (error) {
		console.log('error', error)
	}
	console.log('iconData', iconData)

	// Add icon list to src
	const listPath = path.join(__dirname, 'src/icons/icon-list.json')
	fs.writeFileSync(listPath, JSON.stringify(iconData.iconMap, null, 2))
}

makeIcons()
