import React from "react";
import styles from "./styles.module.css";

const SectionHeading = (props) => {
  return (
    <div className={styles.heading} onClick={props.handleClick}>
      <div className={styles.line}></div>
      <div className={styles.title}>
        {props.children}
        <span
          className={`${styles.arrow} ${
            props.isOpen ? styles.arrowUp : styles.arrowDown
          }`}
        ></span>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default SectionHeading;
