/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface VideoWithSkeletonRef {
  play: () => Promise<void | undefined>;
  pause: () => void;
  reset: () => void;
  addEventListener: (
    type: keyof HTMLMediaElementEventMap,
    listener: (this: HTMLVideoElement, ev: Event) => any,
    options?: boolean | AddEventListenerOptions
  ) => void;
  removeEventListener: (
    type: keyof HTMLMediaElementEventMap,
    listener: (this: HTMLVideoElement, ev: Event) => any,
    options?: boolean | EventListenerOptions
  ) => void;
  element: HTMLVideoElement | null; // optional direct access to the video DOM
}
interface VideoWithSkeletonProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  className?: string;
}

const VideoWithSkeleton = forwardRef<
  VideoWithSkeletonRef,
  VideoWithSkeletonProps
>(({ className = '', ...props }, ref) => {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    play: async () => {
      try {
        return await videoRef.current?.play();
      } catch (err) {
        console.warn('Video play() failed:', err);
      }
    },
    pause: () => videoRef.current?.pause(),
    reset: () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    },
    addEventListener: (type, listener, options) =>
      videoRef.current?.addEventListener(type, listener, options),
    removeEventListener: (type, listener, options) =>
      videoRef.current?.removeEventListener(type, listener, options),
    element: videoRef.current,
  }));

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

      <video
        ref={videoRef}
        {...props}
        onLoadedData={() => setLoaded(true)}
        className={`w-full h-full object-cover rounded-2xl transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
});

VideoWithSkeleton.displayName = 'VideoWithSkeleton';
export default VideoWithSkeleton;
