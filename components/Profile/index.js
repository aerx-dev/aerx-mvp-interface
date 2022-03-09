import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import styles from "./styles.module.css";
import FloatingIconButtons from "./FloatingIconButtons";

const Profile = () => {
  return (
    <div className={styles.page}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={styles.mainContainer}>
        <Main />
      </div>
      <div className={styles.iconButtonsGroupContainer}>
        <FloatingIconButtons />
      </div>
    </div>
  );
};

export default Profile;
