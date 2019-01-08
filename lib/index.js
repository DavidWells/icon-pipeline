const path = require('path')
const readDir = require('./fs/readDir')
const emptyDir = require('./fs/emptyDir')
const optimizeSVGs = require('./svg/optimizeSVGs')
const updateContents = require('./svg/update-contents')
const generateSprite = require('./generate-sprite')
const generateIconMap = require('./generate-map')

const defaultSettings = {
	disableClasses: false,
	includeSpriteInSrc: false
}

module.exports = async function iconPipeline(config = defaultSettings) {
	let iconFiles
	let iconMap
	let outputFiles
	let spriteFiles
	const { srcDir, outputDir, disableClasses } = config

	if (!srcDir || !outputDir) {
		throw new Error('Missing srcDir or outputDir')
	}

	try {
		await emptyDir(outputDir)

		const iconsFileNames = await readDir(srcDir)

		const icons = iconsFileNames.filter((ico) => {
		  return ico.match(/\.svg$/) && !ico.match(/sprite/)
		})

		iconFiles = icons.map((ico) => {
			return path.join(srcDir, ico)
		})

		// optimize icons
		console.log('OptimizeSVGs')
		rawSVGData = await optimizeSVGs(iconFiles, outputDir)

		const outputFilesName = await readDir(outputDir)

		outputFiles = outputFilesName.map((name) => {
			return path.join(outputDir, name)
		})

		if (!disableClasses) {
			console.log('Add Sprite class names')
			// update svg icon classnames for advanced styling
			await updateContents(outputFiles, config)
		}

		console.log('Generate sprite')
		// await generateSprite(outputDir, files, srcDir, config)
		spriteFiles = await generateSprite(outputFiles, config)

		console.log('Generate sprite list')
		iconMap = await generateIconMap(icons, outputDir)

	} catch (e) {
		throw new Error(e)
	}
	return {
		iconFiles: iconFiles,
		iconMap: iconMap,
		spriteFiles: spriteFiles,
		outputFiles: outputFiles
	}
}

