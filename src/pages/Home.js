import React from "react";
import { Layout, Card, List, Typography } from "antd";
import { useState } from "react";
import Login from "../components/Login";

const { Content } = Layout;
const { Text } = Typography;

const Home = ({ loggedIn, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false); // 状态变量控制Login弹窗

  const showLoginModal = () => {
    if (!loggedIn) {
      setIsLoginModalVisible(true); // 显示Login弹窗
    }
  };

  const handleLoginSuccess = () => {
    // 处理登录成功后的状态
    setIsLoginModalVisible(false);
    onLoginSuccess(); // 调用外部传入的onLoginSuccess回调
  };

  // 使用GitHub托管的图片链接初始化数据
  const initialData = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    title: `Item ${index + 1}`,
    price: (index + 1) * 10, // 示例价格
    // 用你的GitHub用户名、仓库名替换下面的URL
    url: `https://raw.githubusercontent.com/candiceKD/image/main/image${
      index + 1
    }.jpg`,
  }));

  const [data, setData] = useState(initialData);
  // const [data, setData] = useState([]);

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
        <List
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          //list里面最重要的两个部分: dataSource是把源数据这个数组拿过来,
          //data是一个javaScript object, 是通过utils.js最后那句 return response.json()把后端返回的json string立体化成object
          //renderItem是把dataSource里面的数据一个一个的转化成jsx
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                key={item.id}
                title={
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {item.title}
                  </Text>
                }
                extra={<Text type="secondary">${item.price}</Text>}
                onClick={showLoginModal} // 点击卡片显示登录弹窗
              >
                <div
                  style={{
                    cursor: "pointer", // 更改鼠标样式以指示可点击
                    display: "inline-block", // 或者 'block' 取决于布局
                    width: "100%", // 容器宽度
                  }}
                >
                  <img
                    alt="Placeholder" //alt是alternative description
                    src={item.url}
                    style={{
                      width: "100%", // 容器宽度
                      height: "252px", // 容器高度
                      objectFit: "cover", // 保持图片纵横比，确保图片完整显示在容器内
                      objectPosition: "center", // 图片居中显示
                    }}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Content>
      <Login
        externalVisible={isLoginModalVisible} // 传递isLoginModalVisible作为外部控制的visible属性
        onExternalCancel={() => setIsLoginModalVisible(false)} // 传递一个方法来更新isLoginModalVisible状态
        onSuccess={handleLoginSuccess}
        showButton={false} // 这里确保不显示Login按钮
      />
    </Layout>
  );
};

export default Home;
