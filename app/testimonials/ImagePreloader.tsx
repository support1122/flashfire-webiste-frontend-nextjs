import { ALL_REVIEW_IMAGES } from "@/src/components/homePageHappyUsers/homePageHappyUsers";

/**
 * Server component — preloads only the first 4 visible testimonial images.
 * More than that competes for bandwidth and actually slows loading.
 * The rest load lazily via native browser lazy loading.
 */
export default function ImagePreloader() {
  const criticalImages = ALL_REVIEW_IMAGES.slice(0, 4);

  return (
    <>
      {criticalImages.map((src, i) => (
        <link
          key={i}
          rel="preload"
          as="image"
          href={src}
          // @ts-expect-error fetchpriority is valid HTML but not yet in React types
          fetchpriority="high"
        />
      ))}
    </>
  );
}
