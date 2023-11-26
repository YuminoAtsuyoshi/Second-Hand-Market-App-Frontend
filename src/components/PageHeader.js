import React from "react";
import { Layout, Input, Select, Form, Button, Row, Col, Space } from "antd";
import {
  SearchOutlined,
  ShopOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import UserDropdown from "./UserDropdown";

const { Header } = Layout;
const { Option } = Select;

function PageHeader({ loggedIn, signoutOnClick, signinOnSuccess }) {
  const filter = (
    <Select defaultValue="Filter">
      <Option value="title">By Title</Option>
      <Option value="location">By Location</Option>
      <Option value="id">By ID</Option>
      <Option value="description">By Description</Option>
    </Select>
  );

  const onSubmit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("onSubmit");
      }, 1000);
    });
  };

  return (
    <Header>
      <Row justify="space-between">
        <Col>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            <ShopOutlined style={{ fontSize: 24 }} />
            <Link to="/" style={{ color: "white" }}>
              &emsp;Second Hand Market
            </Link>
          </div>
        </Col>
        <Col>
          <Space>
            <Form name="search" layout="inline" onFinish={onSubmit}>
              <Form.Item name="item_name">
                <Input placeholder="Search for anything" addonAfter={filter} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" shape="round" htmlType="submit">
                  <SearchOutlined />
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Col>
        <Col>
          <Link to="/sell">
            <Button shape="round">Sell</Button>
          </Link>
        </Col>
        {!loggedIn && (
          <>
            <Col>
              <Login onSuccess={signinOnSuccess} />
            </Col>
          </>
        )}
        {!loggedIn && (
          <>
            <Col>
              <Register />
            </Col>
          </>
        )}
        {loggedIn && (
          <>
            <Col>
              <Button shape="round">
                <MessageOutlined />
              </Button>
            </Col>
          </>
        )}
        {loggedIn && (
          <>
            <Col>
              <Button shape="round">
                <ShoppingCartOutlined />
              </Button>
            </Col>
          </>
        )}
        {loggedIn && (
          <>
            <Col>
              <UserDropdown signout={signoutOnClick} />
            </Col>
          </>
        )}
      </Row>
    </Header>
  );
}

export default PageHeader;
