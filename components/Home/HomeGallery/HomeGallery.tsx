import { useRef, useState, useEffect } from 'react'
import { EffectComposer } from '@react-three/postprocessing'
import { WaveMaterial } from './HomeGallery.texture'
import { Canvas, extend } from '@react-three/fiber'
import { AsciiRenderer } from '../../Three/AsciiRenderer'
import { ImagePlane } from './ImagePlane'
import { urlForImage } from 'lib/sanity.image'

extend({ WaveMaterial })

export const HomeGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((activeIndex + 1) % images.length)
      console.log(activeIndex)
    }, 6000)

    return () => {
      clearTimeout(intervalRef.current)
    }
  }, [images, activeIndex])

  const handlePointerEnter = () => {
    setIsHovering(true)
  }

  const handlePointerLeave = () => {
    setIsHovering(false)
  }

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
        gl={{ alpha: true }}
      >
        <mesh
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          {images?.map((image: any, index: number) => {
            const url = urlForImage(image).width(800).quality(100).url()
            return (
              <ImagePlane
                key={index}
                url={url}
                aspectRatio={image.aspectRatio}
                isActive={index === activeIndex}
                isHovering={isHovering}
              />
            )
          })}
        </mesh>

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
