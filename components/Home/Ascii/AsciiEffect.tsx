import { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'
import { Uniform, Vector2, Color } from 'three'
import { useThree } from '@react-three/fiber'
import { createCharactersTexture } from './utils'
import { ASCIIShader } from './AsciiShader'

// Extend Effect class for post-processing
class CustomAsciiEffect extends Effect {
  constructor({
    characters = ' .:-+*=%@#',
    cellSize = 8,
    invert = true,
    color = '#ffffff',
    fontSize = 32,
    aspectRatio = 1,
  } = {}) {
    const charactersTexture = createCharactersTexture(
      512,
      512,
      characters.split(''),
      fontSize
    )

    super('CustomAsciiEffect', ASCIIShader.fragmentShader, {
      uniforms: new Map<string, Uniform<any>>([
        ['uCharacters', new Uniform(charactersTexture)],
        ['uCharactersCount', new Uniform(characters.length)],
        ['uCellSize', new Uniform(cellSize)],
        ['uColor', new Uniform(new Color(color))],
        ['uInvert', new Uniform(invert)],
        ['resolution', new Uniform(new Vector2())],
      ]),
    })
  }

  update(renderer, inputBuffer, deltaTime) {
    if (this.uniforms) {
      this.uniforms
        .get('resolution')
        ?.value.set(
          renderer.getSize(new Vector2()).width,
          renderer.getSize(new Vector2()).height
        )
    }
  }
}

// Create React component
export const AsciiEffect = forwardRef(
  (
    {
      characters = ' .:-+*=%@#',
      cellSize = 8,
      invert = true,
      color = '#ffffff',
      fontSize = 24,
    }: any,
    ref
  ) => {
    const { size, viewport } = useThree()

    const effect = useMemo(() => {
      return new CustomAsciiEffect({
        characters,
        cellSize,
        invert,
        color,
        fontSize,
        // aspectRatio: viewport.aspect
      })
    }, [characters, cellSize, invert, color, fontSize])

    return <primitive ref={ref} object={effect} dispose={null} />
  }
)
