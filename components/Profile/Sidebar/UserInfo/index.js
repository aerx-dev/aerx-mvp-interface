import React from "react";
import styles from "./styles.module.css";
import {
  CloudUploadOutlined,
  CloudDownloadOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Item from "./item";
import { FaWallet } from "react-icons/fa";

const UserInfo = (props) => {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userSocialContainer}>
        <Item
          value={props.following}
          title="Following"
          users={[
            { name: "Remy Sharp", image: "/images/1/following_img1.jpeg" },
            { name: "Travis Howard", image: "/images/1/following_img2.jpeg" },
            { name: "Cindy Baker", image: "/images/1/following_img3.jpeg" },
          ]}
        />
        <Item
          value={props.followers}
          title="Followers"
          users={[
            { name: "Remy Sharp", image: "/images/1/follower_img1.jpeg" },
            { name: "Travis Howard", image: "/images/1/follower_img2.jpeg" },
            { name: "Cindy Baker", image: "/images/1/follower_img3.jpeg" },
          ]}
        />
        <Item value={props.likes} title="Likes" />
        <Item value={props.reposts} title="Reposts" />
      </div>
      <div className={styles.walletContainer}>
        {/* <h5 className={styles.balanceHeading}>Wallet balance</h5> */}
        <div className={styles.wallet}>
          <div className="flex items-center">
            <FaWallet style={{ fontSize: 20, marginRight: 12 }} />
            <h3 className={styles.balance}>{props.balance}</h3>
          </div>
          <div className={styles.iconButtonsContainer}>
            <CloudUploadOutlined className={styles.uploadBtn} />
            <CloudDownloadOutlined className={styles.downloadBtn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
