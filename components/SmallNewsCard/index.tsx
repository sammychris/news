import React from "react";
import styles from "./SmallNewsCard.module.css";
import Link from "next/link";
import VideoThumbnail from "../VideoThumbnail";
import Image from "next/image";
import { shortenText } from "../../utils/shorten-text";

interface Props {
  link: string;
  title: string;
  image: string;
  video: string;
  author: string;
  date: string;
}

const SmallNewsCard: React.FC<Props> = ({
  link,
  title,
  image,
  video,
  author,
  date,
}) => {
  return (
    <article className={styles.artitle}>
      <div className={styles.media}>
        <Link href={link} title={title}>
          {image ? (
            <Image width={104} height={104} src={image} alt={""} />
          ) : video ? (
            <VideoThumbnail videoId={video} title={""} />
          ) : (
            <Image
              width={104}
              height={104}
              src={"/images/news-placeholder.png"}
              alt={""}
            />
          )}
        </Link>
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>
          <Link href={link}>{shortenText(title, 100)}</Link>
        </h4>
        <h4 className={styles.info}>
          <span className={styles.author}>{author}</span>
          <span className={styles.date}> / {date}</span>
        </h4>
      </div>
    </article>
  );
};

export default SmallNewsCard;
