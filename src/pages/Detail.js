import React from "react";
import Map, { NavigationControl } from "react-map-gl";
import { Layout, Col, Row, Button } from "antd";
import { useParams, useLocation } from "react-router-dom";
import { checkout } from "../utils";
import "mapbox-gl/dist/mapbox-gl.css";

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

  const coord = (index) => {
    if (location.state.location === "New York") {
      return index === 1 ? 40.73 : -73.94;
    } else if (location.state.location === "Los Angeles") {
      return index === 1 ? 34.05 : -118.24;
    } else if (location.state.location === "Chicago") {
      return index === 1 ? 41.88 : -87.62;
    } else if (location.state.location === "San Francisco") {
      return index === 1 ? 37.77 : -122.43;
    } else if (location.state.location === "Washington") {
      return index === 1 ? 38.89 : -77.01;
    } else if (location.state.location === "Dallas") {
      return index === 1 ? 32.78 : -96.81;
    } else if (location.state.location === "Houston") {
      return index === 1 ? 29.75 : -95.36;
    } else if (location.state.location === "Boston") {
      return index === 1 ? 42.36 : -71.06;
    } else if (location.state.location === "Seattle") {
      return index === 1 ? 47.61 : -122.34;
    } else if (location.state.location === "Philadelphia") {
      return index === 1 ? 39.95 : -75.17;
    } else {
      return index === 1 ? 40.73 : -73.94; // New York as default
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
        <Row>
          <Map
            mapboxAccessToken="pk.eyJ1IjoieXVtaW5vYXRzdXlvc2hpIiwiYSI6ImNscG5ycWFuazBjdjQyamw4Z2R5ajlkZTcifQ.cZFkEwzKB3tm3JodfVHTzQ"
            initialViewState={{
              latitude: coord(1),
              longitude: coord(2),
              zoom: 10,
            }}
            style={{ width: "100%", height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <NavigationControl position="top-left" />
          </Map>
        </Row>
      </Content>
    </Layout>
  );
};

export default Detail;
