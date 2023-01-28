import React from "react";
import styles from "./HorizontalCard.module.css";
import Link from "next/link";
import VideoThumbnail from "../VideoThumbnail";

interface Props {
  link: string;
  title: string;
  text: string;
  image: string;
  video: string;
}
const HorizontalCard: React.FC<Props> = ({
  link,
  title,
  text,
  image,
  video,
}) => {
  return (
    <article className={styles.artitle}>
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
        <h4>
          <Link href={link}>{title}</Link>
        </h4>
        <p>{text}</p>
      </div>
    </article>
  );
};

export default HorizontalCard;
