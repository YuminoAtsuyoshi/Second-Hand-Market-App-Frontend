import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Home = () => {
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
        <h1>Home</h1>
      </Content>
    </Layout>
  );
};

export default Home;
