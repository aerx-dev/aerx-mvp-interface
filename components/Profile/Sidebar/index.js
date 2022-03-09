import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import UserBio from "./UserBio";
import UserInfo from "./UserInfo";
import IconButton from "../IconButton";
import { SettingFilled, NotificationFilled } from "@ant-design/icons";
import { MdBookmark, MdNotifications } from "react-icons/md";

const Sidebar = (props) => {
  return (
    <aside className={styles.sidebar} {...props}>
      {/* Site logo */}
      <div className={styles.logoContainer}>
        <Image
          src="/images/aerx_logo-removebg.svg"
          alt="aerx-logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex justify-center mb-4">
        <div className={styles.profileImgContainer}>
          {/* profile image here */}
          <Image
            src="/images/1/profile3.png"
            alt="profile"
            layout="fill"
            objectFit="contain"
            className={styles.profileImg}
          />
        </div>
      </div>
      <UserBio
        displayName="Ivan Ivanov"
        userName="ivan.ivanov"
        about="I work as a doctor, but in my free time I like to make funny pictures and videos. See more details in my collection ."
      />
      <UserInfo
        balance="786,01æ"
        following="4.5K"
        followers="750K"
        likes="10K"
        reposts="875"
      />
      <div className="flex justify-between gap-4 p-12">
        <div className="flex flex-col items-center">
          <IconButton
            icon={<MdBookmark style={{ color: "#367588", fontSize: 24 }} />}
          />
          <p className="font-jest" style={{ fontSize: 16 }}>
            Favorites
          </p>
        </div>
        <div className="flex flex-col items-center">
          <IconButton
            icon={
              <MdNotifications style={{ color: "#D56277", fontSize: 24 }} />
            }
          />
          <p className="font-jest" style={{ fontSize: 16 }}>
            Notifications
          </p>
        </div>
        <div className="flex flex-col items-center">
          <IconButton
            icon={<SettingFilled style={{ color: "#C1BC7D", fontSize: 20 }} />}
          />
          <p className="font-jest" style={{ fontSize: 16 }}>
            Settings
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
