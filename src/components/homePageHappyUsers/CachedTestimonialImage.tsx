import Image from "next/image";
import { memo, useMemo } from "react";

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

// Stable style objects — never recreated between renders
const STYLE_CLICKABLE = {
  width: '100%' as const,
  height: 'auto' as const,
  objectFit: 'contain' as const,
  cursor: 'pointer' as const,
} as const;

const STYLE_DEFAULT = {
  width: '100%' as const,
  height: 'auto' as const,
  objectFit: 'contain' as const,
  cursor: 'default' as const,
} as const;

function CachedTestimonialImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  onClick,
}: CachedTestimonialImageProps) {
  // Local WebP files are already pre-compressed — skip Next.js re-processing
  const isLocalWebp = src.startsWith("/") && src.endsWith(".webp");
  const style = onClick ? STYLE_CLICKABLE : STYLE_DEFAULT;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={isLocalWebp ? undefined : 75}
      sizes={sizes}
      onClick={onClick}
      unoptimized={isLocalWebp}
      style={style}
    />
  );
}

// React.memo — only re-render when props actually change
export default memo(CachedTestimonialImage);
