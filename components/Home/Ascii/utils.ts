import {
  CanvasTexture,
  RepeatWrapping,
  NearestFilter,
  EquirectangularReflectionMapping,
} from 'three'

import { constellation } from 'pages/_app'

export const createCharactersTexture = (
  width: number,
  height: number,
  characters: string[],
  fontSize: number,
  viewport: {
    width?: number
    height?: number
    aspect?: number
    factor?: number
  }
) => {
  const canvas = document.createElement('canvas')
  const aspect = viewport.aspect || 1
  const SIZE = Math.max(width, height)
  const WIDTH = width
  const HEIGHT = height / aspect
  const MAX_PER_ROW = 16
  const DPR = window.devicePixelRatio || 1
  const CELL = MAX_PER_ROW / DPR

  canvas.width = WIDTH * DPR
  canvas.height = HEIGHT * DPR

  canvas.style.width = `${WIDTH}px`
  canvas.style.height = `${HEIGHT}px`

  const context = canvas.getContext('2d', {
    alpha: true,
    antialias: false,
    desynchronized: true,
  }) as CanvasRenderingContext2D
  if (!context) throw new Error('Context not available')

  // Clear and set up context
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#fff'
  context.imageSmoothingEnabled = false
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.scale(DPR, DPR)

  // Use a larger fontSize for initial rendering
  const scaledFontSize = fontSize * DPR
  context.font = `${scaledFontSize}px ${constellation.style.fontFamily}`

  // Draw characters
  characters.forEach((char, i) => {
    const x = i % MAX_PER_ROW
    const y = Math.floor(i / MAX_PER_ROW)
    const centerX = x * (CELL * DPR) + (CELL * DPR) / 2
    const centerY = y * (CELL * DPR) + (CELL * DPR) / 2
    context.fillText(char, centerX, centerY)
  })

  // Create downscaled canvas
  const finalCanvas = document.createElement('canvas')
  finalCanvas.width = finalCanvas.height = SIZE
  const finalContext = finalCanvas.getContext('2d', {
    alpha: true,
    antialias: false,
    desynchronized: true,
  }) as CanvasRenderingContext2D

  if (!finalContext) throw new Error('Final context not available')

  finalContext.imageSmoothingEnabled = false
  finalContext.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    WIDTH,
    HEIGHT
  )

  // Create texture from downscaled canvas
  const texture = new CanvasTexture(
    finalCanvas,
    EquirectangularReflectionMapping,
    RepeatWrapping,
    RepeatWrapping,
    NearestFilter,
    NearestFilter
  )

  texture.generateMipmaps = true
  texture.needsUpdate = true
  return texture
}
