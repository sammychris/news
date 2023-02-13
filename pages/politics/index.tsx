import Header from "../../components/Header";
import HorizontalCard from "../../components/HorizontalCard";
import { GetServerSideProps } from "next";
import { imPoweredRequest } from "../../utils/api-request";
import styles from "../../styles/Home.module.css";
import Loader from "@/components/Loader";
import Ads, { getAdsProps } from "@/components/Ads";
import SignUpForm from "@/components/SignUpForm";
import NewsHub from "@/components/NewsHub";
import ViewMoreButton from "@/components/ViewMoreButton";

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
  trendingPosts: Array<PostProps>;
  posts: Array<PostProps>;
  size: number;
}

const Politics: React.FC<Props> = (props) => {
  const { size, posts } = props;
  if (!props?.posts.length) return <Loader />;
  const posts1 = posts.slice(0, 3);
  const posts2 = posts.slice(3, 6);
  return (
    <>
      <div className={styles.collectionHeaderBG}>
        <header className={styles.collectionHeader}>
          <h1>Politics</h1>
          <p>
            Stay ahead of the game with Verge Politics, your go-to source for
            daily political updates. We bring you the latest in government and
            international relations, keeping a close eye on how current events
            shape the political landscape. Our articles are carefully crafted to
            provide you with the most comprehensive and informed political
            coverage.
          </p>
        </header>
      </div>

      <div className={styles.collectionContainer}>
        <div className={styles.leftSide}>
          {posts1?.map((post: PostProps) => {
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
        <div className={styles.rightSide}>
          <Ads posts={props.trendingPosts} />
        </div>
      </div>

      <div className={styles.collectionContainer}>
        <div>
          {posts1?.map((post: PostProps) => {
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
        <div>
          <SignUpForm />
        </div>
      </div>
      <div className={styles.container}>
        <NewsHub title="Related News" posts={posts} />
      </div>

      <div className={styles.container}>
        <ViewMoreButton title="View More in Related News" link="/politics" />
      </div>
    </>
  );
};

export default Politics;

export const getServerSideProps: GetServerSideProps = async () => {
  let adsProps = await getAdsProps();
  const LIVE_SERVER =
    "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/blogs/collections";

  const result = await imPoweredRequest("POST", LIVE_SERVER, {
    collection_type: "POLITICS",
  });

  let posts = [];
  let size = 0;
  let trendingPosts = [];

  if (result) {
    posts = result?.result?.blogs;
    size = result?.result?.size;
    trendingPosts = adsProps.props.posts;
  }

  return {
    props: { size, posts, trendingPosts },
  };
};
