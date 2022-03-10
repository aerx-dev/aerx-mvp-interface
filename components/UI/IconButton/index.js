import React from "react";
import styles from "./styles.module.css";

const IconButton = (props) => {
    return (
        <div onClick={props.onClick} className={styles.iconButton}>
            {props.children}
        </div>
    );
};

export default IconButton;
