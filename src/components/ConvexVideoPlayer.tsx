import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface ConvexVideoPlayerProps {
  storageId: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  style?: React.CSSProperties;
}

export const ConvexVideoPlayer: React.FC<ConvexVideoPlayerProps> = ({
  storageId,
  className = "",
  muted = false,
  loop = false,
  playsInline = true,
  autoPlay = false,
  controls = true,
  videoRef,
  style,
}) => {
  const url = useQuery(api.files.getUrl, { storageId });

  if (url === undefined) {
    // Loading state
    return (
      <div className={`flex items-center justify-center bg-black/45 backdrop-blur-md rounded-[1.75rem] aspect-[9/16] ${className}`} style={{ minHeight: '150px', ...style }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-t-2 border-cyan animate-spin" />
          <span className="text-xs text-gray-500 font-mono">Loading Video...</span>
        </div>
      </div>
    );
  }

  if (url === null) {
    // Error state
    return (
      <div className={`flex items-center justify-center bg-black/60 border border-red-500/20 rounded-[1.75rem] aspect-[9/16] ${className}`} style={{ minHeight: '150px', ...style }}>
        <div className="text-center p-4">
          <p className="text-xs text-red-400 font-mono mb-1">Failed to find video</p>
          <p className="text-[10px] text-gray-500 font-mono max-w-xs break-all">{storageId}</p>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={url}
      className={className}
      controls={controls}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={autoPlay}
      style={style}
    />
  );
};
