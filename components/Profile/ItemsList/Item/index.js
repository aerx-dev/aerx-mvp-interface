import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const CollectionItem = (props) => {
  console.log("img: ", props.img);
  return (
    <div className={styles.itemContainer}>
      <div className={styles.text}>{props.text}</div>
      {/* <span className={styles.icon}>{props.icon}</span> */}
      <div className={styles.imageContainer}>
        {props.img && (
          <Image
            src={props.img}
            alt="profile"
            layout="fill"
            objectFit="fill"
            className={styles.img}
          />
        )}
      </div>
    </div>
  );
};

export default CollectionItem;
