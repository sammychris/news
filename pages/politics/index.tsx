import Header from "../../components/Header";
import HorizontalCard from "../../components/HorizontalCard";
import { GetServerSideProps } from "next";
import { imPoweredRequest } from "../../lib/request";
import styles from "../../styles/Home.module.css";
import Loader from "@/components/Loader";

type SectionProps = {
  type: string;
  text: string;
  image: string;
  video: string;
  id: string;
  title: string;
  option_one: string;
  option_two: string;
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
  size: number;
}

const Politics: React.FC<Props> = (props) => {
  const { size, posts } = props;
  if (!props?.posts.length) return <Loader />;

  return (
    <>
      <div className={styles.container}>
        <div>
          {posts?.map((post: any) => {
            let img_header = "";
            let vid_header = "";
            post?.sections?.forEach((section: any) => {
              if (section.type === "IMAGE" && img_header === "") {
                img_header = section.image;
              }

              if (section.type === "VIDEO" && img_header === "") {
                vid_header = section.video;
              }
            });

            const title = post?.title?.trim() || post.sub_title;
            return (
              <HorizontalCard
                link={`/politics/${post.id}/${title
                  ?.replace(/\s/g, "-")
                  .toLowerCase()}`}
                title={title}
                image={img_header}
                text={post.sections[0].text}
                video={vid_header}
                key={post.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Politics;

export const getServerSideProps: GetServerSideProps = async () => {
  const LIVE_SERVER =
    "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/blogs/collections";

  const result = await imPoweredRequest("POST", LIVE_SERVER, {
    collection_type: "POLITICS",
  });

  let posts = [];
  let size = 0;

  if (result) {
    posts = result?.result?.blogs;
    size = result?.result?.size;
  }
  return { props: { size, posts } };
};
