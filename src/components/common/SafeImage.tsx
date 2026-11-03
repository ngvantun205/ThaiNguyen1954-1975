"use client";

import { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export default function SafeImage({
  src,
  alt,
  className,
  fallback = null,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt || ""}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}

