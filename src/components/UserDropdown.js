import React from "react";
import { Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

function UserDropdown({ signout }) {
  const username = localStorage.getItem("username");

  const items = [
    {
      key: "1",
      label: (
        <>
          <b>Hello, {username}</b>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <Link to="/purchase-history">Purchase History</Link>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <Link to="/selling">Selling</Link>
        </>
      ),
    },
    {
      key: "4",
      label: <div onClick={signout}>Logout</div>,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }}>
        <Button className="button-align" shape="round">
          <UserOutlined />
        </Button>
      </Dropdown>
    </>
  );
}

export default UserDropdown;
