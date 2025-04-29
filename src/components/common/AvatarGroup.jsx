import React from "react";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Tooltip } from "antd";
export const AvatarGroup = () => (
  <>
    <Avatar.Group size={"large"}>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <a href="https://ant.design">
        <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
      </a>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{ backgroundColor: "#1677ff" }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
  </>
);

export const AvatarWithText = ({ useremail }) => {
  const firstLetter = useremail.charAt(0).toUpperCase();
  return (
    <>
      <Avatar
        style={{
          filter: "invert(100%)",
        }}
      >
        {firstLetter}
      </Avatar>
    </>
  );
};
