import Image from "next/image";

interface CachedBlogImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  itemProp?: string;
}

export default function CachedBlogImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  itemProp,
}: CachedBlogImageProps) {
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
      itemProp={itemProp}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
}
