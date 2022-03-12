import React from "react";
import styles from "./styles.module.css";

const CardOutlined = (props) => {
    return <div className={styles.outlinedCard}>{props.children}</div>;
};

export default CardOutlined;
