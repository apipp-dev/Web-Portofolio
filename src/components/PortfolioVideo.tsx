import React, { useEffect, useRef, useState } from "react";

interface PortfolioVideoProps {
  youtubeId?: string;
  youtubeIdBefore?: string;
  youtubeIdAfter?: string;
  isComparison?: boolean;
  title: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function PortfolioVideo({
  youtubeId,
  youtubeIdBefore,
  youtubeIdAfter,
  isComparison = false,
  title,
}: PortfolioVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeContainerRef = useRef<HTMLDivElement>(null);
  const afterContainerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const playerRef = useRef<any>(null);
  const playerBeforeRef = useRef<any>(null);
  const playerAfterRef = useRef<any>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const isComp = isComparison || (youtubeIdBefore && youtubeIdAfter);

  const isVertical = (() => {
    const mainId = youtubeId || youtubeIdAfter || youtubeIdBefore;
    if (!mainId) return true;
    const landscapeIds = ["dQw4w9WgXcQ"]; // list for future horizontal/landscape videos
    return !landscapeIds.includes(mainId);
  })();

  // Viewport-based pre-rendering trigger
  useEffect(() => {
    const el = outerRef.current;
    if (!el) {
      setHasEnteredView(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" } // trigger 600px before appearing on screen (feels instant to the user)
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasEnteredView) return;

    let intervalId: any;

    const createPlayers = () => {
      // Handle Comparison Player
      if (isComp) {
        if (beforeContainerRef.current && !playerBeforeRef.current && window.YT?.Player) {
          playerBeforeRef.current = new window.YT.Player(beforeContainerRef.current, {
            videoId: youtubeIdBefore,
            playerVars: {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: youtubeIdBefore,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              playsinline: 1,
              iv_load_policy: 3,
              disablekb: 1,
              fs: 0,
            },
            events: {
              onReady: (event: any) => {
                event.target.mute();
                event.target.playVideo();
              },
              onStateChange: (event: any) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  event.target.playVideo();
                }
              },
            },
          });
        }

        if (afterContainerRef.current && !playerAfterRef.current && window.YT?.Player) {
          playerAfterRef.current = new window.YT.Player(afterContainerRef.current, {
            videoId: youtubeIdAfter,
            playerVars: {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: youtubeIdAfter,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              playsinline: 1,
              iv_load_policy: 3,
              disablekb: 1,
              fs: 0,
            },
            events: {
              onReady: (event: any) => {
                event.target.mute();
                event.target.playVideo();
              },
              onStateChange: (event: any) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  event.target.playVideo();
                }
              },
            },
          });
        }
      } else {
        // Handle Single Player
        if (containerRef.current && !playerRef.current && window.YT?.Player) {
          playerRef.current = new window.YT.Player(containerRef.current, {
            videoId: youtubeId,
            playerVars: {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: youtubeId,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              playsinline: 1,
              iv_load_policy: 3,
              disablekb: 1,
              fs: 0,
            },
            events: {
              onReady: (event: any) => {
                event.target.mute();
                event.target.playVideo();
              },
              onStateChange: (event: any) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  event.target.playVideo();
                }
              },
            },
          });
        }
      }
    };

    const checkAndCreate = () => {
      if (window.YT && window.YT.Player) {
        createPlayers();
        if (intervalId) clearInterval(intervalId);
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayers();
    } else {
      if (!document.getElementById("youtube-iframe-api-script")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      intervalId = setInterval(checkAndCreate, 150);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      
      // Clean up players on unmount
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try { playerRef.current.destroy(); } catch (e) {}
        playerRef.current = null;
      }
      if (playerBeforeRef.current && typeof playerBeforeRef.current.destroy === "function") {
        try { playerBeforeRef.current.destroy(); } catch (e) {}
        playerBeforeRef.current = null;
      }
      if (playerAfterRef.current && typeof playerAfterRef.current.destroy === "function") {
        try { playerAfterRef.current.destroy(); } catch (e) {}
        playerAfterRef.current = null;
      }
    };
  }, [youtubeId, youtubeIdBefore, youtubeIdAfter, isComp, hasEnteredView]);

  const toggleSound = () => {
    if (isComp) {
      const pBefore = playerBeforeRef.current;
      const pAfter = playerAfterRef.current;
      if (!pBefore || !pAfter) return;

      if (isMuted) {
        try {
          pBefore.unMute();
          pBefore.setVolume(80);
        } catch (err) {}
        try {
          pAfter.unMute();
          pAfter.setVolume(80);
        } catch (err) {}
        setIsMuted(false);
      } else {
        try { pBefore.mute(); } catch (err) {}
        try { pAfter.mute(); } catch (err) {}
        setIsMuted(true);
      }
    } else {
      const p = playerRef.current;
      if (!p) return;

      if (isMuted) {
        try {
          p.unMute();
          p.setVolume(80);
        } catch (err) {}
        setIsMuted(false);
      } else {
        try { p.mute(); } catch (err) {}
        setIsMuted(true);
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    // Detect if this was a click/tap (minimal movement) to toggle sound
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (dx < 5 && dy < 5) {
      toggleSound();
    }
  };

  if (!hasEnteredView) {
    return (
      <div 
        ref={outerRef}
        className={`video-frame group relative bg-[#090a0f] ${isVertical ? "is-vertical" : "is-landscape"}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-cyan animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={outerRef}
      className={`video-frame group relative ${isVertical ? "is-vertical" : "is-landscape"}`}
      onClick={isComp ? undefined : toggleSound}
    >
      {isComp ? (
        <div
          className="w-full h-full relative cursor-col-resize select-none touch-pan-y z-10"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* AFTER Video (Base Layer) */}
          <div className="absolute inset-0 w-full h-full youtube-player overflow-hidden">
            <div ref={afterContainerRef} className="w-full h-full pointer-events-none" />
          </div>

          {/* BEFORE Video (Clip Layer) */}
          <div 
            className="absolute inset-0 w-full h-full youtube-player overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <div ref={beforeContainerRef} className="w-full h-full pointer-events-none" />
          </div>

          {/* Slider line and knob */}
          <div 
            className="absolute top-0 bottom-0 z-30 w-0.5 bg-cyan shadow-[0_0_14px_rgba(0,242,254,0.55)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/95 border border-white/20 flex items-center justify-center shadow-2xl transition-all duration-200 pointer-events-none ${
                isDragging 
                  ? 'scale-110 border-cyan text-cyan shadow-[0_0_15px_rgba(0,242,254,0.4)]' 
                  : 'text-white/80'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
                <polyline points="9 18 3 12 9 6" />
              </svg>
            </div>
          </div>

          {/* Before & After Badges */}
          <div className="absolute bottom-4 left-4 z-40 px-3 py-1 rounded-full bg-black/75 border border-cyan/30 text-cyan text-[9px] font-black tracking-widest backdrop-blur-md pointer-events-none">
            BEFORE
          </div>
          <div className="absolute bottom-4 right-4 z-40 px-3 py-1 rounded-full bg-black/75 border border-pink/30 text-pink text-[9px] font-black tracking-widest backdrop-blur-md pointer-events-none">
            AFTER
          </div>
        </div>
      ) : (
        <div className="w-full h-full youtube-player overflow-hidden">
          <div ref={containerRef} className="w-full h-full pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
        </div>
      )}
    </div>
  );
}
