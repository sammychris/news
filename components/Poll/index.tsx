import React, { useState } from "react";
import styles from "./Poll.module.css";
import { imPoweredRequest } from "../../lib/request";

interface Props {
  title: string;
  blo_uuid: string;
  sec_uuid: string;
  option_one: string;
  option_two: string;
}

const Poll: React.FC<Props> = ({
  title = "No Title Yet",
  blo_uuid,
  sec_uuid,
  option_one,
  option_two,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vote, setVote] = useState("");

  const handleVote = async (option: string) => {
    setVote(option);
    const LIVE_SERVER =
      "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/blogs/vote";

    const data = {
      blo_uuid,
      sec_uuid,
      key_name: option,
    };
    const result = await imPoweredRequest("POST", LIVE_SERVER, data);
    if (result.ok) {
      setShowForm(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    const LIVE_SERVER =
      "https://us-central1-impowered-funnel.cloudfunctions.net/funnel/marketing/email/welcome";

    e.preventDefault();
    const data = {
      type: "POLL",
      blo_uuid,
      email,
      first_name,
      last_name,
    };

    const result = await imPoweredRequest("POST", LIVE_SERVER, data);
    if (result) {
      setUserSubmitted(result.ok);
    }
    setLoading(false);
  };

  if (userSubmitted) {
    return (
      <div className={styles.container}>
        <div>Thank you for your submission</div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {!showForm ? (
        <div className={styles.optionContainer}>
          <div
            className={styles.optionRow}
            onClick={() => handleVote(option_one)}
          >
            <div className={styles.option}></div>
            <div className={styles.optionText}>{option_one}</div>
          </div>
          <div
            className={styles.optionRow}
            onClick={() => handleVote(option_two)}
          >
            <div className={styles.option}></div>
            <div className={styles.optionText}>{option_two}</div>
          </div>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Last name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Poll;
