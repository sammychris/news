import React from "react";
import styles from "./VoteItem.module.css";

interface Props {
  option: string;
  handleVote: (arg: string) => void;
}

const VoteItem: React.FC<Props> = ({ option, handleVote }) => {
  return (
    <div className={styles.voteOption} onClick={() => handleVote(option)}>
      <div className={styles.voteOptionRow}>
        <div className={styles.voteOptionBox}>
          <input type="radio" />
        </div>
        <div className={styles.voteOptionText}>{option}</div>
      </div>
      <div className={styles.voteOptionPadding}></div>
      <div className={styles.voteOptionSeperator}></div>
    </div>
  );
};

export default VoteItem;
