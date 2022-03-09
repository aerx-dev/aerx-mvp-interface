import React from "react";
import styles from "./styles.module.css";

export default function IconButton({ icon, text }) {
  console.log(icon, text);
  return (
    <>
      {text == null ? (
        <div
          className={styles.root}
          style={text != null ? { width: 72 } : null}
        >
          {icon}
        </div>
      ) : (
        <div className={styles.rootText}>
          {icon} <span style={{ paddingLeft: 8, fontSize: 12 }}>{text}</span>
        </div>
      )}
    </>
  );
}
