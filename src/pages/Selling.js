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
      price: "$20.00",
      status: "Submitted",
      buyer: "N/A",
    },
    {
      img: "https://m.media-amazon.com/images/I/41nxqnBe11L.jpg",
      item_name: "Keyboard",
      id: "234567",
      price: "$90.00",
      status: "Purchased",
      buyer: "Student 1",
    },
    {
      img: "https://m.media-amazon.com/images/I/41nxqnBe11L.jpg",
      item_name: "Table lamp",
      id: "345678",
      price: "$20.00",
      status: "Delivered",
      buyer: "Student 2",
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
          <b>Selling</b>
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
                Item ID: {item.id}
                <br />
                Price: {item.price}
                <br />
                Status: {item.status}
                <br />
                Buyer: {item.buyer}
              </Col>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Purchase;
