import React from "react";
import styles from "./NewsHub.module.css";
import SmallNewsCard from "../SmallNewsCard";
import SmallNewsCardList from "../SmallNewsCardList";
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
  author: string;
  published_date: string;
};

interface Props {
  posts: Array<PostProps>;
  title: string;
  // style: React.CSSProperties;
}

const NewsHub: React.FC<Props> = ({ title, posts }) => {
  return (
    <div className={styles.newsHub}>
      <h2>{title}</h2>
      <div className={styles.container}>
        {/* <div className={styles.collections}> */}
        {/* {title && <h2>{title}</h2>} */}
        {posts?.map((post: PostProps) => {
          let img_header = "";
          let vid_header = "";

          // if (post?.collection !== TITTLE) return "";

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
              author={post.author}
              date={post.published_date}
            />
          );
        })}
        {/* </div> */}
      </div>
    </div>
  );
};

export default NewsHub;
