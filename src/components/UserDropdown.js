import React from "react";
import { Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

function UserDropdown({ signout }) {
  const items = [
    {
      key: "1",
      label: <>My Order</>,
    },
    {
      key: "2",
      label: <>Favorite List</>,
    },
    {
      key: "3",
      label: <>Purchase History</>,
    },
    {
      key: "4",
      label: <>Setting</>,
    },
    {
      key: "5",
      label: <>Saved Seller</>,
    },
    {
      key: "6",
      label: <>Meaasge</>,
    },
    {
      key: "7",
      label: <div onClick={signout}>Logout</div>,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }}>
        <Button shape="round">
          <UserOutlined />
        </Button>
      </Dropdown>
    </>
  );
}

export default UserDropdown;
