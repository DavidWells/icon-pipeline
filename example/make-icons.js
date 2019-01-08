const path = require('path')
const iconPipeline = require('../lib/index')

const iconFolder = path.join(__dirname, 'src', 'icons')
const buildFolder = path.join(__dirname, 'build', 'icons')

iconPipeline({
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
}).then((data) => {
	console.log('Finished processing Icons', data)
}).catch((e) => {
	console.log(e)
})