"use client";

import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#f3f4f6",
            backgroundImage:
              "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}
      <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={75}
        sizes={sizes}
        onClick={onClick}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
          cursor: onClick ? "pointer" : "default",
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
