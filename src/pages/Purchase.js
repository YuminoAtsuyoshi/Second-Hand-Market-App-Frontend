import React from "react";
import { Layout, Typography, List, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;

const Purchase = () => {
  const navigate = useNavigate();

  // const initialData = Array.from({ length: 20 }, (_, index) => ({
  //   id: index,
  //   title: `Item ${index + 1}`,
  //   price: (index + 1) * 10, // 示例价格
  //   // 用你的GitHub用户名、仓库名替换下面的URL
  //   url: `https://raw.githubusercontent.com/candiceKD/image/main/image${
  //     index + 1
  //   }.jpg`,
  //   user: `John Smith`,
  //   location: `Boston`,
  //   status: `saleing`,
  // }));

  const initialData = [
    {
      id: "f281b74b-9237-40e0-9804-b0da60680716",
      user: "Simon",
      title: "Chair",
      price: 80,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/f281b74b-9237-40e0-9804-b0da60680716?generation=1702875002025638&alt=media",
      location: "Philadelphia",
    },
    {
      id: "751d403e-92b3-4c01-9920-e7ae6b8ff812",
      user: "Simon",
      title: "FOSSIL Watch",
      price: 1200,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/751d403e-92b3-4c01-9920-e7ae6b8ff812?generation=1702874986070804&alt=media",
      location: "Seattle",
    },
    {
      id: "01828beb-2542-46fd-922a-065833a3283d",
      user: "Simon",
      title: "iPad",
      price: 900,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/01828beb-2542-46fd-922a-065833a3283d?generation=1702874967440079&alt=media",
      location: "Boston",
    },
    {
      id: "b7677640-dda4-4f2b-ae28-fffcc702c652",
      user: "Simon",
      title: "The Beatles Vinyl",
      price: 200,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/b7677640-dda4-4f2b-ae28-fffcc702c652?generation=1702874952636442&alt=media",
      location: "Houston",
    },
    {
      id: "7765abf4-e11a-49e9-a7de-94cb1a3e7a11",
      user: "Simon",
      title: "Guitar 2",
      price: 1000,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/7765abf4-e11a-49e9-a7de-94cb1a3e7a11?generation=1702874930374502&alt=media",
      location: "Dallas",
    },
    {
      id: "2ee55915-87fb-4430-a3e7-b02db458b146",
      user: "Simon",
      title: "Chanel",
      price: 500,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/2ee55915-87fb-4430-a3e7-b02db458b146?generation=1702874917998517&alt=media",
      location: "Washington",
    },
    {
      id: "62f03a1d-b76e-4dfc-b530-e617bcdb9e7d",
      user: "Simon",
      title: "PS5",
      price: 400,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/62f03a1d-b76e-4dfc-b530-e617bcdb9e7d?generation=1702874900166575&alt=media",
      location: "San Francisco",
    },
    {
      id: "20846cc9-abaa-4692-b83b-a931a3cb643d",
      user: "Simon",
      title: "MacBook",
      price: 1000,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/20846cc9-abaa-4692-b83b-a931a3cb643d?generation=1702874887655907&alt=media",
      location: "Chicago",
    },
    {
      id: "b335a787-333f-4cf1-b8fc-443458687d18",
      user: "Simon",
      title: "The legend of Zelda",
      price: 50,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/b335a787-333f-4cf1-b8fc-443458687d18?generation=1702874865963230&alt=media",
      location: "Los Angeles",
    },
    {
      id: "7da398e3-f161-4202-9686-27c95698e56b",
      user: "Simon",
      title: "PS4",
      price: 300,
      url: "https://storage.googleapis.com/download/storage/v1/b/abigail-bucket/o/7da398e3-f161-4202-9686-27c95698e56b?generation=1702874841574221&alt=media",
      location: "New York",
    },
  ];

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
