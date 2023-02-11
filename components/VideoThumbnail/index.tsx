import React from "react";
import Image from "next/image";

interface Props {
  videoId: string;
  title: string;
  className?: string;
  width?: number;
  height?: number;
}

const VideoThumbnail: React.FC<Props> = ({
  videoId,
  title,
  className,
  width = 104,
  height = 104,
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    // <img src={thumbnailUrl} alt={title} loading="lazy" className={className} />
    <Image
      width={width}
      height={height}
      src={thumbnailUrl}
      alt={title}
      className={className}
    />
  );
};

export default VideoThumbnail;
