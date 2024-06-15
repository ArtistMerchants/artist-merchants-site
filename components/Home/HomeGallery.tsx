import { useRef } from 'react'
import { EffectComposer } from '@react-three/postprocessing'
import { WaveMaterial } from './HomeGallery.texture'
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { MathUtils } from 'three'
import gsap from 'gsap'
import { AsciiRenderer } from '../Three/AsciiRenderer'

extend({ WaveMaterial })

export const HomeGallery = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="relative h-full w-full">
      <Canvas
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 10,
          pointerEvents: 'none',
          backgroundColor: 'transparent',
        }}
        // @ts-ignore
        eventSource={ref}
        dpr={2}
      >
        <ImagePlane url="/hoodie.jpg" />

        <EffectComposer>
          <AsciiRenderer
            characters="ABCDEFGHI"
            bgColor="transparent"
            resolution={0.1}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

function ImagePlane({ url }) {
  const ref = useRef<any>(null)
  const texture: any = useTexture(url)
  const mouseLerped = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  useFrame(({ pointer }) => {
    ref.current.uniforms.uTexture.value = texture
    mouseLerped.current.x = MathUtils.lerp(
      mouseLerped.current.x,
      pointer.x,
      0.04
    )
    mouseLerped.current.y = MathUtils.lerp(
      mouseLerped.current.y,
      pointer.y,
      0.04
    )
    ref.current.uniforms.uMouse.value.x = mouseLerped.current.x
    ref.current.uniforms.uMouse.value.y = mouseLerped.current.y
  })

  const addIntensity = () => {
    gsap.to(ref.current.uniforms.uIntensity, {
      value: 1,
      duration: 1.8,
      ease: 'power3.out',
    })
  }

  const removeIntensity = () => {
    gsap.to(ref.current.uniforms.uIntensity, {
      value: 0.0,
      duration: 1.8,
      ease: 'power3.out',
    })
  }

  const aspect = 5997 / 8247

  const planeWidth = viewport.width
  const planeHeight = viewport.width / aspect

  return (
    <group onPointerEnter={addIntensity} onPointerLeave={removeIntensity}>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 128, 128]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh>
        <planeGeometry args={[planeWidth, planeHeight, 128, 128]} />
        <waveMaterial
          attach="material"
          ref={ref}
          key={WaveMaterial.key}
          map={texture}
          toneMapped={true}
        ></waveMaterial>
      </mesh>
    </group>
  )
}
