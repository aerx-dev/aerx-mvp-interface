import React from "react";
import styles from "./styles.module.css";

const Card = (props) => {
    return (
        <section className={styles.cardContainer}>
            <div>{props.children}</div>
        </section>
    );
};

export default Card;
