import styles from "@/styles/Home.module.css";
import Blog from "../../../components/Blog";
import { GetServerSideProps } from "next";
import { imPoweredRequest } from "../../../lib/request";
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
  post: PostProps;
}

const Index: React.FC<Props> = (props) => {
  if (!props?.post) return <Loader />;
  const { title, author, collection, published_date, sections, id } =
    props.post;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <Blog
            title={title}
            author={author}
            date={published_date}
            sections={sections}
            collection={collection}
            id={id}
          />
        </div>
        <div className={styles.rightSide}></div>
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
  const LIVE_SERVER =
    "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/blogs";

  const result = await imPoweredRequest("POST", LIVE_SERVER, {
    blo_uuid: params.id,
  });

  let post = null;

  if (result) post = result?.result?.blogs[0];
  return { props: { post } };
};
