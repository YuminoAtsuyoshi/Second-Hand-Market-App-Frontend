import React from "react";
import { Layout, Typography, List, Col } from "antd";

const { Content } = Layout;
const { Text } = Typography;

const Purchase = () => {
  const data = [
    {
      img: "https://m.media-amazon.com/images/I/41nxqnBe11L.jpg",
      item_name: "Book",
      id: "123456",
      seller: "Student 1",
      price: "$20.00",
      status: "Delivered",
      rating: "☆☆☆☆☆",
    },
    {
      img: "https://m.media-amazon.com/images/I/41nxqnBe11L.jpg",
      item_name: "Keyboard",
      id: "234567",
      seller: "Student 2",
      price: "$90.00",
      status: "Shipped",
      rating: "☆☆☆☆☆",
    },
  ];
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
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Col flex="180px">
                <img width={150} alt={item.item_name} src={item.img} />
              </Col>
              <Col flex="auto">
                <Text style={{ fontSize: "16px" }}>
                  <b>{item.item_name}</b>
                </Text>
                <br />
                Order ID: {item.id}
                <br />
                Seller: {item.seller}
                <br />
                Price: {item.price}
                <br />
                Status: {item.status}
                <br />
                Rating: {item.rating}
              </Col>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Purchase;
