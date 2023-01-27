import React from "react";
import styles from "./NewsCard.module.css";
import Link from "next/link";
import VideoThumbnail from "../VideoThumbnail";

interface Props {
  link: string;
  title: string;
  image: string;
  video: string;
}

const Index: React.FC<Props> = ({ link, title, image, video }) => {
  return (
    <article className={styles.article}>
      <div className={styles.media}>
        <Link href={link} title={title}>
          {image ? (
            <img src={image} alt={title} loading="lazy" />
          ) : video ? (
            <VideoThumbnail videoId={video} title={title} />
          ) : (
            <img
              src="/images/news-placeholder.png"
              alt={title}
              loading="lazy"
            />
          )}
        </Link>
      </div>
      <div className={styles.content}>
        <h2>
          <Link href={link}>{title}</Link>
        </h2>
      </div>
    </article>
  );
};

export default Index;
