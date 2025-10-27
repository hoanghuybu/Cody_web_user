import React, { useState } from 'react';

interface ImageWithSkeletonProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  className = '',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton shimmer */}
      <div
        className={`absolute inset-0 bg-gray-200 transition-opacity duration-700 
        before:absolute before:inset-0 before:-translate-x-full 
        before:animate-[shimmer_1.5s_infinite] 
        before:bg-gradient-to-r before:from-transparent 
        before:via-white/60 before:to-transparent 
        ${loaded ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Actual image */}
      <img
        {...props}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default ImageWithSkeleton;
