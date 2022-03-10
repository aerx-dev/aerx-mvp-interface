import React from "react";
import styles from "./styles.module.css";

const IconButtonsGroups = (props) => {
    return (
        <div
            className={`${styles.iconButtonsGroup} ${
                props.orientation === "vertical" ? styles.vertical : ""
            } `}
        >
            {props.children}
        </div>
    );
};

export default IconButtonsGroups;
