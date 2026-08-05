'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

interface AppImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
}

export default function AppImage({ src, alt, className, ...props }: AppImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
