import React from "react";
import { GrAdd } from "react-icons/gr";
import styles from "./styles.module.css";

const UserBio = (props) => {
  return (
    <div className={styles.userBioContainer}>
      <div className={styles.flexContainer}>
        <h3 className={styles.displayName}>{props.displayName}</h3>
        <button className={styles.followBtn}>
          Follow
          <GrAdd className={styles.addIcon} />
        </button>
      </div>
      <h5 className={styles.userName}>@{props.userName}</h5>
      <h4 className={styles.aboutHeading}>About :</h4>
      <p className={styles.aboutContent}>{props.about}</p>
    </div>
  );
};

export default UserBio;
