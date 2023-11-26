import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

function Sell() {
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
        <h1>Sell</h1>
      </Content>
    </Layout>
  );
}

export default Sell;
