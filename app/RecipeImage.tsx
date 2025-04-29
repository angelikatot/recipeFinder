'use client';

import { useState } from 'react';
import Image from 'next/image';

interface RecipeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const RecipeImage = ({ src, alt, width, height, className }: RecipeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
    setImgSrc('/placeholder-recipe.jpg'); // this image in my public folder, i use it as placeholder for recipes without a pic
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      style={{ objectFit: 'cover' }}
    />
  );
};

export default RecipeImage;