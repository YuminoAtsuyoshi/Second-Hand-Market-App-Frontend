import {
  Layout,
  Card,
  List,
  Typography,
  message,
  Select,
  Row,
  Col,
} from "antd";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { getRecentItems } from "../utils";

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const Home = ({
  loggedIn,
  onLoginSuccess,
  searchResults,
  isSearchPerformed,
}) => {
  console.log("Home received searchResults:", searchResults);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false); // 状态变量控制Login弹窗
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState([]); // 新状态用于存储排序后的数据
  const [sortOrder, setSortOrder] = useState("recent");

  // 当搜索状态或搜索结果改变时，更新 sortedData
  useEffect(() => {
    const sortData = (data) => {
      if (sortOrder === "asc") {
        return [...data].sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        return [...data].sort((a, b) => b.price - a.price);
      } else if (sortOrder === "recent") {
        return [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      return data;
    };

    let dataToSort = isSearchPerformed ? searchResults : [];
    if (dataToSort.length) {
      setSortedData(sortData(dataToSort));
    } else {
      getRecentItems()
        .then((data) => {
          setSortedData(sortData(data));
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  }, [isSearchPerformed, searchResults, sortOrder]);

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

  const handleItemClick = (item) => {
    if (!loggedIn) {
      showLoginModal();
    } else {
      navigate(`/item/${item.id}`, {
        state: {
          user: item.user,
          title: item.title,
          description: item.description,
          price: item.price,
          url: item.url,
        },
      });
    }
  };

  // 使用GitHub托管的图片链接初始化数据
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
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Col>
            <Select
              defaultValue={sortOrder}
              style={{ width: 120, marginBottom: 16 }}
              onChange={setSortOrder}
            >
              <Option value="recent">Most Recent</Option>
              <Option value="asc">Lowest Price</Option>
              <Option value="desc">Highest Price</Option>
            </Select>
          </Col>
        </Row>

        {sortedData.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>No matching results found.</p>
          </div>
        ) : (
          <List
            style={{ marginTop: 20 }}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 3,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={sortedData}
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
                      onClick={() => handleItemClick(item)} // 添加点击事件处理器
                    />
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
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
