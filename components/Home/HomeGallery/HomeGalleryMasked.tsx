import { FC, useState } from 'react'
import { urlForImage } from 'lib/sanity.image'
import { motion } from 'framer-motion'
import { Canvas, extend } from '@react-three/fiber'
import { WaveMaterial } from './HomeGallery.texture'
import { EffectComposer } from '@react-three/postprocessing'
import { AsciiRenderer } from 'components/Three/AsciiRenderer'
import { ImagePlane } from './ImagePlane'

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

  const handlePointerEnter = () => {
    setIsHovering(true)
  }

  const handlePointerLeave = () => {
    setIsHovering(false)
  }

  return (
    <motion.div
      className="absolute inset-0 z-[10] h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: 'linear' }}
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
        eventSource={eventSource}
        dpr={2}
        gl={{ alpha: true }}
      >
        <mesh
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          {images?.map((image: any, index: number) => {
            const url = urlForImage(image).width(400).quality(100).url()
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
            resolution={0.07}
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  )
}
