import React from "react";
import styles from "./NewsCardList.module.css";
import NewsCard from "../NewsCard";

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

const NewsCardList: React.FC<Props> = ({ posts }) => {
  return (
    <div className={styles.newsCardContainer}>
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
          <NewsCard
            image={img_header}
            link={`/${post.collection?.toLowerCase()}/${post.id}/${title
              ?.replace(/\s/g, "-")
              .toLowerCase()}`}
            title={title}
            video={vid_header}
            key={post.id}
          />
        );
      })}
    </div>
  );
};
export default NewsCardList;
