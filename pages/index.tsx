import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { imPoweredRequest } from "../utils/api-request";
import { Timeline, Tweet } from "react-twitter-widgets";
import SmallNewsCardList from "@/components/SmallNewsCardList";
import Loader from "@/components/Loader";
import Image from "next/image";
import SignUpForm from "@/components/SignUpForm";
import NewsHub from "@/components/NewsHub";
import ViewMoreButton from "@/components/ViewMoreButton";
import Ads from "@/components/Ads";
import Link from "next/link";

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
  trendPosts: Array<PostProps>;
  size: number;
}

const Home: React.FC<Props> = (props) => {
  const trendingPosts = props?.trendPosts?.slice(0, 4);
  const posts = props?.posts;

  const breakingNews = posts?.slice(0, 1)[0];
  const topNews = posts?.slice(0, 4);
  const mostPopular = posts?.slice(4, 8);
  const newsAnalysis = posts?.slice(0, 6);

  let breakingNewsImg = "";
  let breakingnNewsQuote = "";
  breakingNews?.sections.forEach((section) => {
    if (section.type === "IMAGE") breakingNewsImg = section.image;
    if (section.type === "QUOTE") breakingnNewsQuote = section.text;
  });
  if (!posts.length) return <Loader />;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          {/* <NewsCardList posts={posts} /> */}
          <Link
            href={`/${breakingNews?.collection?.toLowerCase()}/${
              breakingNews?.id
            }/${breakingNews?.title?.replace(/\s/g, "-").toLowerCase()}`}
          >
            <div className={styles.breakingNews}>
              <h1>{breakingNews?.title}</h1>
              <Image
                width={475}
                height={422}
                src={breakingNewsImg || "/images/news-placeholder.png"}
                alt=""
              />
              <p>
                {breakingnNewsQuote ||
                  `"As the saying goes personnel is policy," Trump continued, "and at the end of the day, if we have pink-haired communists teaching our kids, we have a major problem."
`}
                <span>
                  {`${breakingNews?.author} / ${breakingNews?.published_date}`}
                </span>
              </p>
              <div className={styles.line} style={{ marginTop: 40 }}></div>
            </div>
          </Link>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.topNews}>
            <h2>TOP NEWS</h2>
            <SmallNewsCardList posts={topNews} styleType="" />
            <div className={styles.line}></div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.leftSide}>
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
        <div
          className={styles.rightSide}
          style={{ display: "block", width: "unset" }}
        >
          <Ads posts={trendingPosts} />
        </div>
      </div>

      <div className={styles.containerLine}></div>

      <div className={styles.container}>
        <NewsHub title="News Analysis" posts={newsAnalysis} />
      </div>
      <div className={styles.container} style={{ marginTop: 35 }}>
        <ViewMoreButton title="View more in News Analysis" link="/" />
      </div>

      <div className={styles.containerLine}></div>

      <div className={styles.container} style={{ alignItems: "center" }}>
        <div className={styles.mostPopular}>
          <h2>MOST POPULAR</h2>
          <SmallNewsCardList posts={mostPopular} styleType="popular" />
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
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

  const LIVE_TRENDS =
    "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/blogs/collections";

  const trendResult = await imPoweredRequest("POST", LIVE_TRENDS, {
    collection_type: "TRENDING",
  });

  let posts = [];
  let trendPosts = [];
  let size = 0;

  if (result) {
    posts = result?.result?.blogs;
    size = result?.result?.size;
  }

  if (trendResult) {
    trendPosts = trendResult?.result?.blogs;
  }

  return { props: { size, posts, trendPosts } };
};
