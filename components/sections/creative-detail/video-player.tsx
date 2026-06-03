import React from "react";

interface VideoPlayerProps {
  videoId: string | undefined;
  title: string;
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  return (
    <div 
      className="mx-auto aspect-video bg-black mb-12 overflow-hidden rounded-none border border-stroke/50 shadow-2xl"
      style={{ width: "100%", maxWidth: "calc(82vh * 1.777)" }}
    >
      {videoId ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-bone-mute">
          Video unavailable
        </div>
      )}
    </div>
  );
}
