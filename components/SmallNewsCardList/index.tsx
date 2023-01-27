import React from "react";
import styles from "./SmallNewsCardList.module.css";
import SmallNewsCard from "../SmallNewsCard";

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
  title: string;
}

const SmallNewsCardList: React.FC<Props> = ({ posts, title }) => {
  const TITTLE = title?.toUpperCase();
  return (
    <div className={styles.collections}>
      <h2>{title}</h2>
      {posts?.map((post: PostProps) => {
        let img_header = "";
        let vid_header = "";

        if (post?.collection !== TITTLE) return "";

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
          <SmallNewsCard
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
export default SmallNewsCardList;
