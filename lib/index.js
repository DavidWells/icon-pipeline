const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
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
		console.log(`◌ Optimizing SVGs...`)
		rawSVGData = await optimizeSVGs(iconFiles, outputDir)
		console.log()
		console.log(`${chalk.green('✓')} ${rawSVGData.length} SVGs optimized`)
		console.log()
		const outputFilesName = await readDir(outputDir)

		outputFiles = outputFilesName.map((name) => {
			return path.join(outputDir, name)
		})

		if (!disableClasses) {
			console.log('◌ Adding Sprite class names...')
			// update svg icon classnames for advanced styling
			await updateContents(outputFiles, config)
			console.log(`${chalk.green('✓')} SVGs class names added`)
			console.log()
		}

		console.log('◌ Generating sprites...')
		// await generateSprite(outputDir, files, srcDir, config)
		spriteFiles = await generateSprite(outputFiles, config)
		console.log(`${chalk.green('✓')} Files "sprite.js" & "sprite.svg" created`)
		spriteFiles.forEach((file, i) => {
			const symbol = (i === (spriteFiles.length - 1)) ? '└─' : '├─'
			console.log(`  ${symbol} Generated to ${file}`)
		})
		console.log()

		console.log('◌ Generating sprite list')
		const iconMapFileName = 'icon-list.js'
		const iconMapFilePath = path.join(outputDir, iconMapFileName)
		iconMap = await generateIconMap(icons, iconMapFilePath)
		console.log(`${chalk.green('✓')} Sprite list "${iconMapFileName}" generated`)
		console.log(`  └─ Generated to ${iconMapFilePath}`)
		console.log()
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

