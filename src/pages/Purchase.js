import React from "react";
import { Layout, Typography, List, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

const Purchase = () => {
  const navigate = useNavigate();

  const initialData = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    title: `Item ${index + 1}`,
    price: (index + 1) * 10, // 示例价格
    // 用你的GitHub用户名、仓库名替换下面的URL
    url: `https://raw.githubusercontent.com/candiceKD/image/main/image${
      index + 1
    }.jpg`,
    user: `John Smith`,
    location: `Boston`,
    status: `saleing`,
  }));

  const handleClick = (item) => {
    navigate(`/item/${item.id}`, {
      state: {
        user: item.user,
        title: item.title,
        description: item.description,
        price: item.price,
        url: item.url,
        location: item.location,
        status: item.status,
      },
    });
  };

  const status = (status) => {
    if (status === "saleing") {
      return "Selling";
    } else if (status === "delivering") {
      return "Delivering";
    } else {
      return "Has sold";
    }
  };

  return (
    <Layout style={{ padding: "24px" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          height: 800,
          overflow: "auto",
        }}
      >
        <Text style={{ fontSize: "20px" }}>
          <b>Purchase History</b>
        </Text>
        <List
          style={{ marginTop: 20 }}
          pagination={{ position: "bottom", align: "end" }}
          dataSource={initialData}
          renderItem={(item) => (
            <List.Item>
              <Col flex="180px">
                <img
                  alt={item.title}
                  src={item.url}
                  style={{
                    width: "150px", // 容器宽度
                    height: "150px", // 容器高度
                    objectFit: "cover", // 保持图片纵横比，确保图片完整显示在容器内
                    objectPosition: "center", // 图片居中显示
                  }}
                  onClick={() => handleClick(item)}
                />
              </Col>
              <Col flex="auto">
                <Text style={{ fontSize: "16px" }}>
                  <b>{item.title}</b>
                </Text>
                <br />
                Item ID: {item.id}
                <br />
                Seller: {item.user}
                <br />
                Price: ${item.price}
                <br />
                Location: {item.location}
                <br />
                Status: {status(item.status)}
              </Col>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Purchase;
