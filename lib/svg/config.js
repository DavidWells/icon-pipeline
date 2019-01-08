module.exports = function svgoConfig(className) {
  return {
    plugins: [{
      cleanupAttrs: true,
    }, {
      removeDoctype: true,
    }, {
      removeXMLProcInst: true,
    }, {
      removeComments: true,
    }, {
      removeMetadata: true,
    }, {
      removeTitle: true,
    }, {
      removeDesc: true,
    }, {
      removeUselessDefs: true,
    }, {
      removeEditorsNSData: true,
    }, {
      removeEmptyAttrs: true,
    }, {
      removeHiddenElems: true,
    }, {
      removeEmptyText: true,
    }, {
      removeEmptyContainers: true,
    }, {
      removeViewBox: false,
    }, {
      cleanUpEnableBackground: true,
    }, {
      convertStyleToAttrs: true,
    }, {
      convertColors: true,
    }, {
      /* https://github.com/svg/svgo/blob/master/plugins/convertPathData.js#L9-L26 */
      // convertPathData: false,
      convertPathData: {
        applyTransforms: true,
        applyTransformsStroked: true,
        makeArcs: {
          threshold: 2.5, // coefficient of rounding error
          tolerance: 0.5 // percentage of radius
        },
        straightCurves: true,
        lineShorthands: true,
        curveSmoothShorthands: true,
        floatPrecision: 3.35,
        transformPrecision: 3,
        removeUseless: true,
        collapseRepeated: true,
        utilizeAbsolute: true,
        leadingZero: true,
        negativeExtraSpace: true
      },
    }, {
      convertTransform: true,
    }, {
      removeUnknownsAndDefaults: true,
    }, {
      removeNonInheritableGroupAttrs: true,
    }, {
      removeUselessStrokeAndFill: true,
    }, {
      removeUnusedNS: true,
    }, {
      cleanupIDs: true,
    }, {
      cleanupNumericValues: true,
    }, {
      moveElemsAttrsToGroup: true,
    }, {
      moveGroupAttrsToElems: true,
    }, {
      collapseGroups: true,
    }, {
      removeRasterImages: false,
    }, {
      mergePaths: true,
    }, {
      convertShapeToPath: true,
    }, {
      sortAttrs: true,
    }, {
      transformsWithOnePath: false,
    }, {
      removeDimensions: true,
    },
    {
      addClassesToSVGElement: {
        className
      }
    }
      // {
      //   removeAttrs: {attrs: '(stroke|fill)'},
      // }
    ]
  }
}
