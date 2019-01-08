
export default function addSVGtoDOM(target, sprite) {
  let svg = target || document.getElementById('svg-sprite')
  if (!svg) {
    svg = document.createElementNS(null, 'svg')
    svg.setAttribute('width', '0')
    svg.setAttribute('height', '0')
    svg.setAttribute('style', 'display: none')
    // svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink')

    svg.setAttribute('id', 'svg-sprite')
    document.body.appendChild(svg)

    const receptacle = document.createElement('div')
    const svgfragment = `<svg>${sprite}</svg>`
    receptacle.innerHTML = `${svgfragment}`
    Array.prototype.slice.call(receptacle.childNodes[0].childNodes).forEach((el) => {
      svg.appendChild(el)
    })
  }
}
