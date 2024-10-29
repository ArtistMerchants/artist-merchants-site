/**
 * Ascii generation based on https://github.com/hassadee/jsascii/blob/master/jsascii.js
 * Optimized for performance and readability
 */

class AsciiEffect {
  constructor(renderer, charSet = ' .:-=+*#%@', options = {}) {
    const {
      resolution = 0.15,
      color = false,
      alpha = false,
      block = false,
      invert = false,
      isMobile = false,
    } = options

    let width, height, iWidth, iHeight

    const domElement = document.createElement('div')
    domElement.style.cursor = 'default'

    const oAscii = document.createElement('table')
    domElement.appendChild(oAscii)

    const oCanvas = document.createElement('canvas')
    const oCtx = oCanvas.getContext('2d')

    const strFont = 'var(--font-constellation)'
    const fFontSize = isMobile ? 5 : 8
    const lineHeightMultiplier = isMobile ? 0.54 : 0.84
    const fLineHeight = fFontSize * lineHeightMultiplier

    function getLetterSpacing() {
      return isMobile ? 0.455 : 4.325
    }

    const aCharList = (
      charSet || (color ? ' CGO08@' : ' .,:;i1tfLCG08@')
    ).split('')
    const fLetterSpacing = getLetterSpacing()

    const asciiLookup = new Array(256)
    for (let i = 0; i < 256; i++) {
      const fBrightness = i / 255
      const iCharIdx = Math.floor(
        (invert ? fBrightness : 1 - fBrightness) * (aCharList.length - 1)
      )
      asciiLookup[i] = aCharList[iCharIdx] || '&nbsp;'
    }

    this.setSize = function (w, h) {
      width = w
      height = h
      renderer.setSize(w, h)
      initAsciiSize()
    }

    this.render = function (scene, camera) {
      renderer.render(scene, camera)
      asciifyImage()
    }

    this.domElement = domElement

    function initAsciiSize() {
      iWidth = Math.floor(width * resolution)
      iHeight = Math.floor(height * resolution) * 3

      oCanvas.width = iWidth
      oCanvas.height = iHeight

      const oStyle = oAscii.style
      oStyle.whiteSpace = 'pre'
      oStyle.margin = '0px'
      oStyle.padding = '0px'
      oStyle.letterSpacing = fLetterSpacing + 'px'
      oStyle.fontFamily = strFont
      oStyle.fontSize = fFontSize + 'px'
      oStyle.lineHeight = fLineHeight + 'px'
      oStyle.textAlign = 'left'
      oStyle.textDecoration = 'none'
    }

    function asciifyImage() {
      oCtx.drawImage(renderer.domElement, 0, 0, iWidth, iHeight)

      // Ensure iWidth and iHeight are integers and within canvas bounds
      const safeWidth = Math.min(Math.floor(iWidth), oCanvas.width)
      const safeHeight = Math.min(Math.floor(iHeight), oCanvas.height)

      // Use safe dimensions for getImageData
      const oImgData = oCtx.getImageData(0, 0, safeWidth, safeHeight).data

      let strChars = ''
      const colorStyle = color ? new Array(safeWidth) : null

      for (let y = 0; y < safeHeight; y += 2) {
        if ((y / 2) % 2 === 1) {
          strChars += '<span class="opacity-0">|</span>'
        }
        for (let x = 0; x < safeWidth; x++) {
          const iOffset = (y * safeWidth + x) * 4
          const [iRed, iGreen, iBlue, iAlpha] = oImgData.slice(
            iOffset,
            iOffset + 4
          )

          const fBrightness =
            iAlpha === 0
              ? 255
              : Math.floor(0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue)

          const strThisChar = asciiLookup[fBrightness]

          if (color) {
            if (!colorStyle[x]) {
              colorStyle[x] = `color:rgb(${iRed},${iGreen},${iBlue});${
                block ? `background-color:rgb(${iRed},${iGreen},${iBlue});` : ''
              }${alpha ? `opacity:${iAlpha / 255};` : ''}`
            }
            strChars += `<span style="${colorStyle[x]}">${strThisChar}</span>`
          } else {
            strChars += strThisChar
          }
        }
        strChars += '<br/>'
      }

      oAscii.innerHTML = `<tr><td style="display:block;width:${width}px;height:${height}px;overflow:hidden">${strChars}</td></tr>`
    }
  }
}

export { AsciiEffect }
