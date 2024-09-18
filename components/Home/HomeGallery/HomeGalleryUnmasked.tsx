import { useImage } from 'hooks/useImage'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const HomeGalleryUnmasked = ({ images, activeIndex }) => {
  return (
    <motion.div
      className="absolute inset-0 z-[11] h-full w-full bg-light-gray"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: 'linear' }}
    >
      {images?.map((image: any, index: number) => {
        return (
          <GalleryImage
            image={image}
            isActive={activeIndex === index}
            key={`unmasked-image-${image._key}`}
          />
        )
      })}
    </motion.div>
  )
}

const GalleryImage = ({ image, isActive }) => {
  const imageProps = useImage(image)
  return (
    <div
      className={`ease ease absolute inset-0 h-full w-full transition-opacity duration-700 ${
        isActive ? 'z-[2] opacity-100' : 'z-[1] opacity-0'
      }`}
      key={`unmasked-image-${image._key}`}
    >
      <Image
        src={imageProps.src}
        alt={image.alt}
        fill
        style={{ objectFit: 'contain' }}
        sizes="(min-width: 768px) 50vw, 100vw"
      />
    </div>
  )
}
