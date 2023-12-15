import React from "react";
import { Button, Layout, Typography, List, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../utils";

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
  }));

  const handleClick = (item) => {
    navigate(`/item/${item.id}`, {
      state: {
        user: item.user,
        title: item.title,
        description: item.description,
        price: item.price,
        url: item.url,
      },
    });
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        // 删除成功后的操作，例如刷新列表
        console.log("Item deleted");
      })
      .catch((error) => {
        // 处理删除时的错误
        console.error("Error deleting item:", error);
      });
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
          <b>Selling</b>
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
                Price: ${item.price}
                <br />
                Status: Submitted
                <br />
                Buyer: N/A
              </Col>
              <Button
                type="primary"
                shape="round"
                onClick={() => handleDelete(item.id)}
              >
                Delete Item
              </Button>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Purchase;
