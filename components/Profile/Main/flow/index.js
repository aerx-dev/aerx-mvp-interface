import React, { useState } from "react";
import Image from "next/image";
import SectionHeading from "../../ItemsList/SectionHeading";
import styles from "./styles.module.css";
import IconButton from "../../IconButton";
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
import Item from "./item";

export default function Flow() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="mt-6">
      <SectionHeading handleClick={toggleList} isOpen={isOpen}>
        Flow
      </SectionHeading>
      {isOpen && (
        <div className={styles.flowContainer}>
          <div className={styles.itemsContainer}>
            <Item
              image="/images/1/forest.jpeg"
              title="Scene in the Red Forest"
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              title="Story #2: The Last Wind"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt culpa qui officia deserunt. Read more..."
              btnText="Buy: 10æ"
            />
            <Item
              image="/images/1/large_hill.png"
              title="Large green mountains, as pictured from the point of view of a bird flying on its migration south."
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              image="/images/1/forest.jpeg"
              title="Scene in the Red Forest"
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              title="Story #2: The Last Wind"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt culpa qui officia deserunt. Read more..."
              btnText="Buy: 10æ"
            />
            <Item
              image="/images/1/large_hill.png"
              title="Large green mountains, as pictured from the point of view of a bird flying on its migration south."
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              image="/images/1/forest.jpeg"
              title="Scene in the Red Forest"
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              title="Story #2: The Last Wind"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt culpa qui officia deserunt. Read more..."
              btnText="Buy: 10æ"
            />
            <Item
              image="/images/1/large_hill.png"
              title="Large green mountains, as pictured from the point of view of a bird flying on its migration south."
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              image="/images/1/forest.jpeg"
              title="Scene in the Red Forest"
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              title="Story #2: The Last Wind"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt. quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt culpa qui officia deserunt. Read more..."
              btnText="Buy: 10æ"
            />
            <Item
              image="/images/1/large_hill.png"
              title="Large green mountains, as pictured from the point of view of a bird flying on its migration south."
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              image="/images/1/forest.jpeg"
              title="Scene in the Red Forest"
              text=""
              btnText="Buy: 81æ"
            />
            <Item
              title="Story #2: The Last Wind"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt. Read more..."
              btnText="Buy: 10æ"
            />
            <Item
              image="/images/1/large_hill.png"
              title="Large green mountains, as pictured from the point of view of a bird flying on its migration south."
              text=""
              btnText="Buy: 81æ"
            />
          </div>
        </div>
      )}
    </div>
  );
}
