import React from "react";
import { Layout, Col, Row, Button } from "antd";
import { useParams, useLocation } from "react-router-dom";

const { Content } = Layout;

const Detail = () => {
  let { id } = useParams();
  const location = useLocation();

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
            <Row>Location: Boston</Row>
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
        </Row>
        <Row style={{ fontSize: "20px" }}>{location.state.description}</Row>
      </Content>
    </Layout>
  );
};

export default Detail;
