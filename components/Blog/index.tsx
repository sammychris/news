import React from "react";
import styles from "./Blog.module.css";
import Image from "next/image";
import IFrame from "../IFrame";
import Poll from "../Poll";

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

interface Props {
  title: string;
  author: string;
  date: string;
  sections: Array<SectionProps>;
  collection: string;
  id: string;
}

const Blog: React.FC<Props> = ({
  title,
  author,
  date,
  sections,
  collection,
  id,
}) => {
  return (
    <div className={styles.blog}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>
        Created by {author} on <span className={styles.date}>{date}</span>
      </p>
      {/* <img src={imgUrl} alt={title} className={styles.image} /> */}
      <main>
        {sections &&
          sections.map((section: SectionProps) => {
            if (section.type == "TEXT") {
              return (
                <div key={section.id}>
                  <article>
                    <p className={styles.paragraph}>{section.text}</p>
                  </article>
                </div>
              );
            }

            if (section.type == "IMAGE") {
              return (
                <div key={section.id}>
                  <Image
                    style={{
                      border: "0.4px solid var(--accent)",
                      borderRadius: "6px",
                    }}
                    src={section.image}
                    alt={section.text}
                    width={750}
                    height={500}
                  />
                  <article>
                    <p className={styles.paragraph}>{section.text}</p>
                  </article>
                </div>
              );
            }

            if (section.type == "VIDEO") {
              return (
                <div key={section.id}>
                  <IFrame
                    videoId={section.video}
                    title={title}
                    className={styles.video}
                  />
                  <article>
                    <p className={styles.paragraph}>{section.text}</p>
                  </article>
                </div>
              );
            }
            if (section.type == "POLL") {
              return (
                <Poll
                  title={section.title}
                  blo_uuid={id}
                  sec_uuid={section.id}
                  option_one={section.option_one}
                  option_two={section.option_two}
                  key={section.id}
                />
              );
            }
          })}
      </main>
    </div>
  );
};

export default Blog;
