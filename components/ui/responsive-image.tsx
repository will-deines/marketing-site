import Image from "next/image"

interface ResponsiveImageProps {
  baseName: string
  alt: string
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
}

export function ResponsiveImage({ 
  baseName, 
  alt, 
  fill = false, 
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 1920px, (min-width: 768px) 1024px, 720px"
}: ResponsiveImageProps) {
  return (
    <picture>
      {/* Modern AVIF format for supported browsers */}
      <source 
        media="(min-width: 1024px)" 
        srcSet={`/covers/${baseName}.avif`} 
        type="image/avif" 
      />
      <source 
        media="(min-width: 768px)" 
        srcSet={`/covers/${baseName}-tablet.avif`} 
        type="image/avif" 
      />
      <source 
        media="(max-width: 767px)" 
        srcSet={`/covers/${baseName}-mobile.avif`} 
        type="image/avif" 
      />
      
      {/* WebP format fallback */}
      <source 
        media="(min-width: 1024px)" 
        srcSet={`/covers/${baseName}.webp`} 
        type="image/webp" 
      />
      <source 
        media="(min-width: 768px)" 
        srcSet={`/covers/${baseName}-tablet.webp`} 
        type="image/webp" 
      />
      <source 
        media="(max-width: 767px)" 
        srcSet={`/covers/${baseName}-mobile.webp`} 
        type="image/webp" 
      />
      
      {/* JPEG fallback for all browsers */}
      <source 
        media="(min-width: 1024px)" 
        srcSet={`/covers/${baseName}.jpg`} 
        type="image/jpeg" 
      />
      <source 
        media="(min-width: 768px)" 
        srcSet={`/covers/${baseName}-tablet.jpg`} 
        type="image/jpeg" 
      />
      <source 
        media="(max-width: 767px)" 
        srcSet={`/covers/${baseName}-mobile.jpg`} 
        type="image/jpeg" 
      />
      
      {/* Default Next.js Image component */}
      <Image 
        src={`/covers/${baseName}.jpg`}
        alt={alt}
        fill={fill}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    </picture>
  )
}