import React, { useState } from "react";
import Image from "next/image";
import SectionHeading from "../../../ItemsList/SectionHeading";
import styles from "./styles.module.css";
import IconButton from "../../../IconButton";
import {
  SyncOutlined,
  MessageOutlined,
  HeartOutlined,
  TagOutlined,
  TagFilled,
  HeartFilled,
  MessageFilled,
} from "@ant-design/icons";
import { RefreshIcon, HeartIcon } from "@heroicons/react/solid";
import { style } from "@mui/system";

export default function Item({ image, title, text, btnText }) {
  return (
    <div className={styles.section}>
      {image ? (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt="profile"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      ) : (
        <p className={styles.largeText}>{text}</p>
      )}
      <div>
        <p className={styles.itemHead}>{title}</p>
        <div className={styles.btnContainer}>
          <IconButton
            icon={<TagFilled style={{ color: "#B9BFD7" }} />}
            text={btnText}
          />
          <div className="flex justify-between gap-4">
            <IconButton icon={<RefreshIcon style={{ color: "#489B50" }} />} />
            <IconButton icon={<MessageFilled style={{ color: "#4D80D1" }} />} />
            <IconButton icon={<HeartFilled style={{ color: "#D56277" }} />} />
          </div>
        </div>
      </div>
    </div>
  );
}
