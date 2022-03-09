import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.css";

export default function Item({ value, title, users }) {
  console.log("users", users);
  return (
    <div className="px-4 mb-6">
      <h3 className="font-medium" style={{ fontSize: 24 }}>
        {value}
      </h3>
      <p className="font-jest text-sm" style={{ fontSize: "1px" }}>
        {title}
      </p>
      <AvatarGroup max={4} className="pt-2">
        {users &&
          users.map((user) => (
            <Avatar
              key={uuidv4()}
              alt={user.name}
              src={user.image}
              className={styles.avatar}
            />
          ))}
      </AvatarGroup>
    </div>
  );
}
