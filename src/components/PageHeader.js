import React, { useState } from "react";
import {
  message,
  Layout,
  Input,
  Select,
  Form,
  Button,
  Row,
  Col,
  Space,
} from "antd";
import { SearchOutlined, ShopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import UserDropdown from "./UserDropdown";
import "../style.css";

const { Header } = Layout;
const { Option } = Select;

function PageHeader({
  loggedIn,
  signoutOnClick,
  signinOnSuccess,
  onSearch,
  resetSearch,
}) {
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("title"); // 默认搜索类型
  const navigate = useNavigate();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const navigateToHome = () => {
    resetSearch();
    navigate("/");
  };

  // 当用户改变下拉选择时，更新搜索类型
  const handleFilterChange = (value) => {
    setSearchType(value);
  };

  const handleSearch = async (values) => {
    if (!loggedIn) {
      // 如果用户未登录，显示登录弹窗
      setIsLoginModalVisible(true);
      return;
    }

    // 检查搜索框是否为空
    if (!values.item_name || values.item_name.trim() === "") {
      message.warning("Please enter your search here!");
      return;
    }

    setLoading(true);
    try {
      // 构建查询对象，包含所选的过滤器和用户输入的值
      const query = { [searchType]: values.item_name };
      await onSearch(query); // 调用App.js的 onSearch 函数，并传入查询对象
      navigate("/");
    } catch (error) {
      message.error("Search failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSellClick = () => {
    if (!loggedIn) {
      setIsLoginModalVisible(true); // 显示登录弹窗
    } else {
      navigate("/sell"); // 用户已登录，跳转到 Sell 页面
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalVisible(false); // 登录成功后关闭弹窗
    signinOnSuccess();
  };

  return (
    <Header>
      <Row justify="space-between">
        <Col>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "black",
              cursor: "pointer",
            }}
            onClick={navigateToHome}
          >
            <ShopOutlined style={{ fontSize: 24 }} />
            &emsp;Second Hand Market
          </div>
        </Col>
        <Col>
          <Space>
            <Form name="search" layout="inline" onFinish={handleSearch}>
              <Form.Item name="item_name">
                <Input
                  placeholder="Search for anything"
                  addonAfter={
                    <Select defaultValue="title" onChange={handleFilterChange}>
                      <Option value="title">By Title</Option>
                      <Option value="description">By Description</Option>
                      <Option value="location">By Location</Option>
                      <Option value="user">By Username</Option>
                    </Select>
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  shape="round"
                  htmlType="submit"
                >
                  <SearchOutlined />
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Col>
        <Col>
          <Button
            className="button-align"
            shape="round"
            onClick={handleSellClick}
          >
            Sell
          </Button>
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
              <UserDropdown signout={signoutOnClick} />
            </Col>
          </>
        )}
      </Row>
      <Login
        externalVisible={isLoginModalVisible}
        onExternalCancel={() => setIsLoginModalVisible(false)}
        onSuccess={handleLoginSuccess}
        showButton={false}
      />
    </Header>
  );
}

export default PageHeader;
