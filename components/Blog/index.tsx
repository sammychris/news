import React from "react";
import styles from "./Blog.module.css";
import Image from "next/image";
import IFrame from "../IFrame";
import Poll from "../Poll";
import { Timeline, Tweet } from "react-twitter-widgets";

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
    <>
      <div className={styles.blog}>
        <div className={styles.leftSide}>
          <div className={styles.leftCentered}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.date}>
              Created by <span className={styles.author}> {author} </span> on{" "}
              {date}
            </p>
          </div>
          <main>
            <article className={styles.leftCentered}>
              <p className={styles.quote}>
                {`A new study reveals how unconscious bias leads us to
                      neglect negative externalities of driving. You may call it
                      ‘car brain,’ but this research team calls it
                      ‘motonormativity.’ Most Americans...`}
              </p>
            </article>
            {sections &&
              sections.map((section: SectionProps) => {
                if (section.type == "QUOTE") {
                  return (
                    <article key={section.id}>
                      <p className={styles.quote}>{section.quote}</p>
                    </article>
                  );
                }
              })}
            <button className={styles.readMore}>Read More</button>
          </main>
        </div>
        <div className={styles.rightSide}>
          <div>
            {sections &&
              sections.map((section: SectionProps) => {
                if (section.type == "IMAGE") {
                  return (
                    <div key={section.id}>
                      <Image
                        style={{
                          borderRadius: "6px",
                        }}
                        src={section.image}
                        alt={section.text}
                        width={598}
                        height={557}
                      />
                      {/* <article>
                    <p className={styles.paragraph}>{section.text}</p>
                  </article> */}
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
                      {/* <article>
                    <p className={styles.paragraph}>{section.text}</p>
                  </article> */}
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>

      <div className={styles.blog}>
        <div className={styles.leftSide}>
          <main>
            {sections &&
              sections.map((section: SectionProps) => {
                if (section.type == "TEXT") {
                  return (
                    <div key={section.id}>
                      <div className={styles.pad}></div>
                      <article>
                        <p className={styles.paragraph}>{section.text}</p>
                      </article>
                    </div>
                  );
                }

                if (section.type == "IMAGE") {
                  return (
                    <div key={section.id}>
                      <article>
                        <p className={styles.paragraph}>{section.text}</p>
                      </article>
                    </div>
                  );
                }

                if (section.type == "VIDEO") {
                  return (
                    <div key={section.id}>
                      <article>
                        <p className={styles.paragraph}>{section.text}</p>
                      </article>
                    </div>
                  );
                }
              })}
          </main>
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
          <div>
            {sections &&
              sections.map((section: SectionProps) => {
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
