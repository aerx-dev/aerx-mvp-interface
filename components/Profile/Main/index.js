import React from "react";
import ItemsList from "../ItemsList";
import styles from "./styles.module.css";
import { MdOndemandVideo } from "react-icons/md";
import Flow from "./flow";

const Main = () => {
  return (
    <main className={styles.main}>
      <ItemsList
        title="Collections"
        items={[
          {
            text: "Images",
            icon: <MdOndemandVideo />,
            img: "/images/1/images.jpeg",
          },
          {
            text: "Memes",
            icon: <MdOndemandVideo />,
            img: "/images/1/meme.png",
          },
          {
            text: "Videos",
            icon: <MdOndemandVideo />,
            img: "/images/1/videos.png",
          },
        ]}
      />
      {/* <ItemsList
        title="Flow"
        items={[
          { text: "Images", icon: <MdOndemandVideo /> },
          { text: "Memes", icon: <MdOndemandVideo /> },
          { text: "Videos", icon: <MdOndemandVideo /> },
        ]}
      /> */}
      <section>
        <Flow />
      </section>
    </main>
  );
};

export default Main;
