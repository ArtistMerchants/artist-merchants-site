import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useTexture, useVideoTexture } from '@react-three/drei'
import { DoubleSide, MathUtils, NormalBlending } from 'three'
import { WaveMaterial } from './HomeGallery.texture'
import * as THREE from 'three'
import gsap from 'gsap'

export function ImagePlane({
  url,
  type = 'image',
  aspectRatio,
  imageSize,
  isActive = false,
  isHovering = false,
}) {
  const ref = useRef<any>(null)
  const [texture, setTexture] = useState<any>(null)
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
      duration: 3,
      ease: 'power3.inOut',
    })
  }

  const hideImage = () => {
    gsap.to(ref.current.uniforms.uOpacity, {
      value: 0.0,
      duration: 3,
      ease: 'power3.inOut',
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
    if (isHovering) {
      addIntensity()
    } else {
      removeIntensity(isActive ? 0.8 : 0.8)
    }
  }, [isHovering, isActive])

  return (
    <group>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      {type === 'image' && (
        <Image
          ref={ref}
          url={url}
          imageSize={imageSize}
          setTexture={setTexture}
        />
      )}
      {type === 'video' && (
        <Video
          ref={ref}
          url={url}
          imageSize={imageSize}
          setTexture={setTexture}
        />
      )}
    </group>
  )
}

const Video = forwardRef(({ url, imageSize, setTexture }: any, ref) => {
  const texture = useVideoTexture(url)
  const { viewport } = useThree()

  useEffect(() => {
    setTexture(texture)
  }, [texture])

  const resolution = useMemo(() => {
    if (!texture) return { width: viewport.width, height: viewport.height }
    return {
      width: texture.source?.data?.videoWidth,
      height: texture.source?.data?.videoHeight,
    }
  }, [texture, viewport])

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
      <waveMaterial
        attach="material"
        ref={ref}
        key={WaveMaterial.key}
        map={texture}
        transparent={true}
        side={DoubleSide}
        uCover={true}
        uImageResolution={
          new THREE.Vector2(resolution.width, resolution.height)
        }
        uResolution={new THREE.Vector2(viewport.width, viewport.height)}
      ></waveMaterial>
    </mesh>
  )
})

const Image = forwardRef(({ url, imageSize, setTexture }: any, ref) => {
  const texture = useTexture(url)
  const { viewport } = useThree()

  useEffect(() => {
    setTexture(texture)
  }, [texture])

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
      <waveMaterial
        attach="material"
        ref={ref}
        key={WaveMaterial.key}
        map={texture}
        transparent={true}
        side={DoubleSide}
        uImageResolution={new THREE.Vector2(imageSize.width, imageSize.height)}
        uResolution={new THREE.Vector2(viewport.width, viewport.height)}
      ></waveMaterial>
    </mesh>
  )
})
