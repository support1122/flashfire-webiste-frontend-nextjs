import type { CSSProperties, ReactNode } from "react";

type ContentVisibilitySectionProps = {
  children: ReactNode;
  className?: string;
  intrinsicSize?: string;
};

/**
 * Keeps SSR output intact while letting the browser defer heavy below-the-fold
 * layout/paint work until the section approaches the viewport.
 */
export default function ContentVisibilitySection({
  children,
  className,
  intrinsicSize = "900px",
}: ContentVisibilitySectionProps) {
  const style: CSSProperties = {
    contentVisibility: "auto",
    containIntrinsicSize: intrinsicSize,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
