import React from "react";

interface Props {
  videoId: string;
  title: string;
  className?: string;
}

const VideoThumbnail: React.FC<Props> = ({ videoId, title, className }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <img src={thumbnailUrl} alt={title} loading="lazy" className={className} />
  );
};

export default VideoThumbnail;
