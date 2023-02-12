import styles from "@/styles/Home.module.css";
import Blog from "../../../components/Blog";
import { GetServerSideProps } from "next";
import { imPoweredRequest } from "../../../utils/api-request";
import Loader from "@/components/Loader";
import NewsHub from "@/components/NewsHub";
import ViewMoreButton from "@/components/ViewMoreButton";
import SmallNewsCardList from "@/components/SmallNewsCardList";
import Ads from "@/components/Ads";

type SectionProps = {
  type: string;
  text: string;
  image: string;
  video: string;
  id: string;
  title: string;
  option_one: string;
  option_two: string;
  quote: string;
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
  post: PostProps;
  posts: Array<PostProps>;
}

const Index: React.FC<Props> = (props) => {
  if (!props?.post) return <Loader />;
  const { title, author, collection, published_date, sections, id } =
    props.post;

  const posts = props?.posts;
  const mostPopular = posts?.slice(0, 4);
  const relatedNews = posts?.slice(0, 6);
  return (
    <>
      <Blog
        title={title}
        author={author}
        date={published_date}
        sections={sections}
        collection={collection}
        id={id}
      />

      <div className={styles.containerLine}></div>

      <div className={styles.container}>
        <NewsHub title="Related News" posts={relatedNews} />
      </div>
      <div className={styles.container}>
        <ViewMoreButton title="View more in Related News" link="/politics" />
      </div>

      <div className={styles.containerLine}></div>

      <div className={styles.container} style={{ alignItems: "center" }}>
        <div className={styles.mostPopular}>
          <h2>MOST POPULAR</h2>
          <SmallNewsCardList posts={mostPopular} styleType="popular" />
        </div>
        <div>
          <Ads posts={mostPopular} />
        </div>
      </div>
    </>
  );
};

export default Index;

interface ParamsType {
  params: {
    id: string;
    slug: string;
  };
}

export const getServerSideProps = async ({ params }: ParamsType) => {
  const collectionResult = await imPoweredRequest(
    "POST",
    "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/blogs/collections",
    {
      collection_type: "POLITICS",
    }
  );

  const blogResult = await imPoweredRequest(
    "POST",
    "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/blogs",
    {
      blo_uuid: params.id,
    }
  );

  let post = null;
  let posts = [];
  let size = 0;

  if (collectionResult) {
    posts = collectionResult?.result?.blogs;
    size = collectionResult?.result?.size;
  }

  if (blogResult) post = blogResult?.result?.blogs[0];
  return { props: { posts, post } };
};
