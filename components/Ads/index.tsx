import React from "react";
import styles from "./Ads.module.css";
import Link from "next/link";
import VideoThumbnail from "../VideoThumbnail";
import Image from "next/image";
import { shortenText } from "@/utils/shorten-text";

type SectionProps = {
  type: string;
  text: string;
  image: string;
  video: string;
};

type PostProps = {
  id: string;
  title: string;
  sub_title: string;
  sections: Array<SectionProps>;
  collection: string;
};
interface Props {
  posts: Array<PostProps>;
}

const Ads: React.FC<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <h2>Trending</h2>
      <ul>
        {posts?.map((post: PostProps) => {
          let img_header = "";
          let vid_header = "";

          post?.sections?.forEach((section: SectionProps) => {
            if (section.type === "IMAGE" && img_header === "") {
              img_header = section.image;
            }

            if (section.type === "VIDEO" && img_header === "") {
              vid_header = section.video;
            }
          });

          const title = post?.title?.trim() || post.sub_title;
          return (
            <li key={post.id}>
              <Link
                href={`/${post.collection?.toLowerCase()}/${post.id}/${title
                  ?.replace(/\s/g, "-")
                  .toLowerCase()}`}
                title={title}
              >
                <div className={styles.ads}>
                  <div className={styles.media}>
                    {img_header ? (
                      <Image
                        width={150}
                        height={104}
                        src={img_header}
                        alt={""}
                      />
                    ) : vid_header ? (
                      <VideoThumbnail
                        videoId={vid_header}
                        title={""}
                        width={150}
                        height={104}
                      />
                    ) : (
                      <Image
                        width={150}
                        height={104}
                        src={"/images/news-placeholder.png"}
                        alt={""}
                      />
                    )}
                  </div>
                  <div className={styles.content}>
                    <h3>{shortenText(title, 50)}</h3>
                    <p>Trending</p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ads;
