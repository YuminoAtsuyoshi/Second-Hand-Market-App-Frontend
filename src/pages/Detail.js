import React from "react";
import { Layout, Col, Row, Button } from "antd";
import { useParams, useLocation } from "react-router-dom";
import { checkout } from "../utils";

const { Content } = Layout;

const Detail = () => {
  let { id } = useParams();
  const location = useLocation();

  const handleBuyClick = () => {
    checkout(id)
      .then(() => {})
      .catch((error) => {
        console.error("Checkout failed:", error);
      });
  };

  const status = () => {
    if (location.state.status === "saleing") {
      return "Selling";
    } else if (location.state.status === "delivering") {
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
        <Row>
          <Col style={{ width: "40vw" }}>
            <img
              style={{ width: "40vw" }}
              alt={location.state.title}
              src={location.state.url}
            />
          </Col>
          <Col style={{ width: "50vw", fontSize: "20px", padding: "10px" }}>
            <Row>
              <b>Item name: {location.state.title}</b>
            </Row>
            <Row>ID: {id}</Row>
            <Row>Seller name: {location.state.user}</Row>
            <Row>Price: ${location.state.price}</Row>
            <Row>Location: {location.state.location}</Row>
            <Row>Status: {status()}</Row>
            <Row style={{ padding: "5px" }}>
              <Button
                shape="round"
                size="large"
                type="primary"
                onClick={handleBuyClick}
              >
                Buy
              </Button>
            </Row>
          </Col>
        </Row>
        <Row style={{ fontSize: "20px" }}>
          <b>Description:</b>
        </Row>
        <Row style={{ fontSize: "20px" }}>{location.state.description}</Row>
      </Content>
    </Layout>
  );
};

export default Detail;
