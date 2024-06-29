import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { DoubleSide, MathUtils, NormalBlending } from 'three'
import gsap from 'gsap'
import { WaveMaterial } from './HomeGallery.texture'

export function ImagePlane({
  url,
  aspectRatio,
  isActive = false,
  isHovering = false,
}) {
  const ref = useRef<any>(null)
  const texture: any = useTexture(url)
  const mouseLerped = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  useFrame(({ pointer }) => {
    ref.current.uniforms.uTexture.value = texture
    mouseLerped.current.x = MathUtils.lerp(
      mouseLerped.current.x,
      pointer.x,
      0.1
    )
    mouseLerped.current.y = MathUtils.lerp(
      mouseLerped.current.y,
      pointer.y,
      0.1
    )
    ref.current.uniforms.uMouse.value.x = mouseLerped.current.x
    ref.current.uniforms.uMouse.value.y = mouseLerped.current.y
  })

  const addIntensity = () => {
    if (!isActive) return
    gsap.to(ref.current.uniforms.uIntensity, {
      value: 2,
      duration: 0.45,
      ease: 'power4.out',
    })
  }

  const removeIntensity = (duration = 0.8) => {
    gsap.to(ref.current.uniforms.uIntensity, {
      value: 0.0,
      duration: duration,
      ease: 'power4.out',
    })
  }

  const showImage = () => {
    gsap.to(ref.current.uniforms.uOpacity, {
      value: 1.0,
      duration: 0.6,
      ease: 'power2.inOut',
    })
  }

  const hideImage = () => {
    gsap.to(ref.current.uniforms.uOpacity, {
      value: 0.0,
      duration: 0.6,
      ease: 'power2.inOut',
    })
  }

  useEffect(() => {
    if (isActive) {
      showImage()
    } else {
      hideImage()
    }
  }, [isActive])

  useEffect(() => {
    if (isHovering && isActive) {
      addIntensity()
    } else {
      removeIntensity(isActive ? 0.8 : 0.8)
    }
  }, [isHovering, isActive])

  const aspect = aspectRatio

  const planeWidth = viewport.width
  const planeHeight = viewport.width / aspect

  // if(aspectRatio < 1) {
  //   planeWidth = viewport.height / aspect
  //   planeHeight = viewport.height
  // }

  return (
    <group>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      <mesh scale={0.9}>
        <planeGeometry args={[planeWidth, planeHeight, 64, 64]} />
        <waveMaterial
          attach="material"
          ref={ref}
          key={WaveMaterial.key}
          map={texture}
          toneMapped={true}
          transparent={true}
          blending={NormalBlending}
          side={DoubleSide}
        ></waveMaterial>
      </mesh>
    </group>
  )
}
