import {
  CanvasTexture,
  RepeatWrapping,
  NearestFilter,
  LinearFilter,
} from 'three'

import { constellation } from 'pages/_app'

export const createCharactersTexture = (
  width: number,
  height: number,
  characters: string[],
  fontSize: number
) => {
  const canvas = document.createElement('canvas')
  const SIZE = Math.max(width, height)
  const MAX_PER_ROW = 16
  const CELL = SIZE / MAX_PER_ROW

  canvas.width = canvas.height = SIZE

  const texture = new CanvasTexture(
    canvas,
    undefined,
    RepeatWrapping,
    RepeatWrapping,
    LinearFilter,
    LinearFilter
  )

  console.log(constellation)

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Context not available')

  context.clearRect(0, 0, SIZE, SIZE)
  context.font = `${fontSize}px ${constellation.style.fontFamily}`
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = '#fff'

  characters.forEach((char, i) => {
    const x = i % MAX_PER_ROW
    const y = Math.floor(i / MAX_PER_ROW)
    context.fillText(char, x * CELL + CELL / 2, y * CELL + CELL / 2)
  })

  texture.needsUpdate = true
  return texture
}
