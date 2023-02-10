import React from "react";
import styles from "./HorizontalCard.module.css";
import Link from "next/link";
import VideoThumbnail from "../VideoThumbnail";
import { shortenText } from "../../utils/shorten-text";

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
        <div className={styles.pad}></div>
        <h4>
          <Link href={link}>{shortenText(title, 80)}</Link>
        </h4>
        <p>{shortenText(text, 200)}</p>

        <p className={styles.info}>
          <span>Samuel Christopher / </span> FEB 1
        </p>
      </div>
    </article>
  );
};

export default HorizontalCard;
