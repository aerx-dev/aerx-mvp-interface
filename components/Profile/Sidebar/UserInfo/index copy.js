import React from "react";
import CardOutlined from "../../../UI/CardOutlined";
import { FiDownload, FiUpload } from "react-icons/fi";
import IconButtonsGroups from "../../../UI/IconButtonsGroup";
import styles from "./styles.module.css";
import { CloudUploadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const UserInfo = (props) => {
  return (
    <div className={styles.userInfoContainer}>
      <div>
        <h4 className={styles.userInfoType}>Wallet</h4>
        <CardOutlined>
          <div className="px-2">
            <h5 className={styles.balanceHeading}>Balance:</h5>
            <h3 className={styles.balance}>{props.balance}</h3>
            <div className={styles.iconButtonsContainer}>
              <CloudUploadOutlined className={styles.uploadBtn} />
              <CloudDownloadOutlined className={styles.downloadBtn} />
            </div>
          </div>
        </CardOutlined>
      </div>
      <div>
        <h4 className={styles.userInfoType}>Social</h4>
        <CardOutlined>
          <div className={styles.userSocialContainer}>
            <section className="px-1 mr-2">
              <h3 className="font-medium" style={{ fontSize: 24 }}>
                {props.following}
              </h3>
              <p className="font-jest text-sm" style={{ fontSize: "1px" }}>
                Following
              </p>
              <AvatarGroup max={4} className="pt-2">
                <Avatar
                  alt="Remy Sharp"
                  src="/images/1/following_img1.jpeg"
                  sx={{ width: 20, height: 20 }}
                  className={styles.avatar}
                />
                <Avatar
                  alt="Travis Howard"
                  src="/images/1/following_img2.jpeg"
                  sx={{ width: 20, height: 20 }}
                />
                <Avatar
                  alt="Cindy Baker"
                  src="/images/1/following_img3.jpeg"
                  sx={{ width: 20, height: 20 }}
                />
              </AvatarGroup>
            </section>
            <section className="px-2">
              <h3 className="font-medium" style={{ fontSize: 24 }}>
                {props.followers}
              </h3>
              <p className="font-jest">Followers</p>
              <AvatarGroup max={4} className="pt-2">
                <Avatar
                  alt="Remy Sharp"
                  src="/images/1/follower_img1.jpeg"
                  sx={{ width: 20, height: 20 }}
                />
                <Avatar
                  alt="Travis Howard"
                  src="/images/1/follower_img2.jpeg"
                  sx={{ width: 20, height: 20 }}
                />
                <Avatar
                  alt="Cindy Baker"
                  src="/images/1/follower_img3.jpeg"
                  sx={{ width: 20, height: 20 }}
                />
              </AvatarGroup>
            </section>
            <section className="pt-4">
              <h3 className="font-medium" style={{ fontSize: 24 }}>
                {props.likes}
              </h3>
              <p className="font-jest">Likes</p>
            </section>
            <section className="pt-4">
              <h3 className="font-medium" style={{ fontSize: 24 }}>
                {props.reposts}
              </h3>
              <p className="font-jest">Reposts</p>
            </section>
          </div>
        </CardOutlined>
      </div>
    </div>
  );
};

export default UserInfo;
