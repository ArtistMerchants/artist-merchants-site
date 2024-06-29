import { FC, useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { WaveMaterial } from './HomeGallery.texture'
import { EffectComposer } from '@react-three/postprocessing'
import { AsciiRenderer } from 'components/Three/AsciiRenderer'
import { ImagePlane } from './ImagePlane'
import { urlForImage } from 'lib/sanity.image'

extend({ WaveMaterial })

type HomeGalleryMaskedProps = {
  activeIndex: number
  images: any[]
  isActive?: boolean
  eventSource?: React.RefObject<HTMLDivElement>
}

export const HomeGalleryMasked: FC<HomeGalleryMaskedProps> = ({
  activeIndex,
  images,
  isActive = true,
  eventSource,
}) => {
  const [isHovering, setIsHovering] = useState(false)

  const handlePointerEnter = () => {
    setIsHovering(true)
  }

  const handlePointerLeave = () => {
    setIsHovering(false)
  }

  return (
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
      eventSource={eventSource}
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
  )
}
