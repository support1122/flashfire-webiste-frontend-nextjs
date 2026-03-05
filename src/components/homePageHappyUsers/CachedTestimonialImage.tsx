import Image from "next/image";

interface CachedTestimonialImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
}

export default function CachedTestimonialImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  onClick,
}: CachedTestimonialImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={80}
      sizes={sizes}
      onClick={onClick}
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        cursor: onClick ? 'pointer' : 'default',
      }}
    />
  );
}
