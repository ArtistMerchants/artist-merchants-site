import { useRef } from 'react'
import type { Settings } from 'lib/sanity.queries'
import { Layout } from './Layout'
import { PortableText } from '@portabletext/react'
import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { AsciiRenderer } from './Three/AsciiRenderer'
import { Suspense } from 'react'
import { WaveMaterial } from './HomePage.texture'
import { MathUtils } from 'three'
import { EffectComposer } from '@react-three/postprocessing'
import gsap from 'gsap'
import { Logo } from './Global/Logo'

extend({ WaveMaterial })

export default function HomePage(props: {
  title?: string
  content?: any
  settings: Settings
}) {
  const { title, content, settings } = props
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Layout>
      <Suspense fallback={null}>
        <div className="grid h-screen w-full grid-cols-9 gap-20 bg-black p-24 text-white">
          <div className="col-span-1">
            <Logo className="h-auto w-40" />
          </div>
          <div className="col-span-3 col-start-2">
            <h1>{title}</h1>
            <PortableText value={content} />
          </div>
          <div
            ref={ref}
            className="relative relative left-[10%] col-span-4 col-start-5 h-full w-[90%] self-end"
          >
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
        </div>
      </Suspense>
    </Layout>
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
      value: 0.0,
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

  return (
    <group onPointerEnter={addIntensity} onPointerLeave={removeIntensity}>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 128, 128]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      <mesh>
        <planeGeometry
          args={[viewport.width, viewport.height * 0.8, 128, 128]}
        />
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
