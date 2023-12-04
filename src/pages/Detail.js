import React from "react";
import { Layout, Typography, Col, Row, Button } from "antd";
import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

const Detail = () => {
  let { id } = useParams();
  const data = {
    img: "https://m.media-amazon.com/images/I/41nxqnBe11L.jpg",
    item_name: "Book",
    id: "123456",
    seller: "Student 1",
    price: "$20.00",
    location: "Boston",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
        <Row>
          <Col style={{ width: "40vw" }}>
            <img
              style={{ width: "40vw" }}
              alt={data.item_name}
              src={data.img}
            />
          </Col>
          <Col style={{ width: "50vw", fontSize: "20px", padding: "10px" }}>
            <Row>
              <b>Item name: {data.item_name}</b>
            </Row>
            <Row>ID: {id}</Row>
            <Row>Seller name: {data.seller}</Row>
            <Row>Price: {data.price}</Row>
            <Row>Location: {data.location}</Row>
            <Row style={{ padding: "5px" }}>
              <Button shape="round" size="large">
                Contact seller
              </Button>
            </Row>
            <Row style={{ padding: "5px" }}>
              <Button shape="round" size="large" type="primary">
                Buy
              </Button>
            </Row>
          </Col>
        </Row>
        <Row style={{ fontSize: "20px" }}>
          <b>Description:</b>
          {data.description}
        </Row>
      </Content>
    </Layout>
  );
};

export default Detail;
