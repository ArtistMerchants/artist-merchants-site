import { FC, useState } from 'react'
import { urlForImage } from 'lib/sanity.image'
import { motion } from 'framer-motion'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { WaveMaterial } from './HomeGallery.texture'
import { EffectComposer } from '@react-three/postprocessing'
import { Stats } from '@react-three/drei'
import { AsciiRenderer } from 'components/Three/AsciiRenderer'
import { ImagePlane } from './ImagePlane'
import { useIsMobile } from 'hooks/useIsMobile'
import { AsciiEffect } from '../Ascii/AsciiEffect'

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
  eventSource,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const isMobile = useIsMobile()

  const handlePointerEnter = () => {
    setIsHovering(true)
  }

  const handlePointerLeave = () => {
    setIsHovering(false)
  }

  return (
    <motion.div
      id="home-gallery-masked"
      className="absolute inset-0 z-[10] h-full w-full select-none"
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handlePointerEnter}
      onTouchEnd={handlePointerLeave}
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
        className="h-full w-full"
        // @ts-ignore
        eventSource={eventSource}
        dpr={2}
        gl={{ alpha: true }}
      >
        <mesh>
          {images?.map((image: any, index: number) => {
            const url = urlForImage(image)
              .width(500)
              .quality(80)
              .auto('format')
              .url()
            return (
              <ImagePlane
                key={index}
                url={url}
                aspectRatio={image.aspectRatio}
                imageSize={{
                  width: image.width,
                  height: image.height,
                }}
                isActive={index === activeIndex}
                isHovering={isHovering}
              />
            )
          })}
        </mesh>

        <Stats />

        <EffectComposer>
          <AsciiEffect
            characters="ABCDEFGHI"
            invert={false}
            cellSize={isMobile ? 6 : 8}
            fontSize={isMobile ? 10 : 8}
          />
          {/* <AsciiRenderer
            characters="ABCDEFGHI"
            bgColor="transparent"
            resolution={isMobile ? 0.25 : 0.1}
            isMobile={isMobile}
          /> */}
        </EffectComposer>
      </Canvas>
    </motion.div>
  )
}
