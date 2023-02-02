import styles from "@/styles/Home.module.css";
import NewsCardList from "@/components/NewsCardList";
import { GetServerSideProps } from "next";
import { imPoweredRequest } from "../lib/request";
import { Timeline, Tweet } from "react-twitter-widgets";
import SmallNewsCardList from "@/components/SmallNewsCardList";
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

const Home: React.FC<Props> = (props) => {
  const posts = props?.posts?.slice(0, 4);
  const posts2 = props?.posts?.slice(4, 8);

  if (!props?.posts.length) return <Loader />;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <NewsCardList posts={posts} />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.tweeterFeeds}>
            <Tweet tweetId="841418541026877441" />
            <Timeline
              dataSource={{
                sourceType: "profile",
                screenName: "TwitterDev",
              }}
              options={{
                height: "400",
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.container}>
        <SmallNewsCardList posts={posts2} title="Trending" />
        <SmallNewsCardList posts={posts2} title="Politics" />
      </div>
      <div className={styles.divider}></div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const LIVE_SERVER =
    "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/blogs";

  const result = await imPoweredRequest("POST", LIVE_SERVER, {
    blo_uuid: "",
  });

  let posts = [];
  let size = 0;

  if (result) {
    posts = result?.result?.blogs;
    size = result?.result?.size;
  }
  return { props: { size, posts } };
};
