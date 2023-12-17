import React, { useState, useEffect } from "react";
import { Button, Layout, Typography, List, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { searchItems, deleteItem } from "../utils";

const { Content } = Layout;
const { Text } = Typography;

const Selling = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");
      const query = { user: username };
      searchItems(query).then((resp) => {
        if (!resp || resp.length === 0) {
          message.info("No selling items found");
          setData([]);
        } else {
          setData(resp);
        }
      });
    } catch (error) {
      message.error(error.message || "An error occurred during the search.");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // const initialData = Array.from({ length: 20 }, (_, index) => ({
  //   id: index,
  //   title: `Item ${index + 1}`,
  //   price: (index + 1) * 10, // 示例价格
  //   // 用你的GitHub用户名、仓库名替换下面的URL
  //   url: `https://raw.githubusercontent.com/candiceKD/image/main/image${
  //     index + 1
  //   }.jpg`,
  //   user: `John Smith`,
  // }));

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

  const handleDelete = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        // 向API发去删除请求后删除本地数据，不再向后端查询新列表，否则太快查到的还是原来的
        message.success("Item deleted");
        setData(data.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        // 处理删除时的错误
        message.error("Error deleting item");
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
          dataSource={data}
          loading={loading}
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
                Location: {item.location}
                <br />
                Status: {status(item.status)}
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

export default Selling;
