import React, { useRef, useState } from "react";
import {
  Layout,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  message,
  Typography,
} from "antd";
import { uploadItem } from "../utils";

const { Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

function Sell() {
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleSubmit = async (values) => {
    const { files } = fileInputRef.current;

    setLoading(true);

    try {
      await uploadItem(values, files[0]);
      message.success("Upload successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ padding: "24px" }}>
      <Content
        className="site-layout-background"
        style={{ padding: 24, margin: 0, height: 800, overflow: "auto" }}
      >
        <Text style={{ fontSize: "20px" }}>
          <b>Selling</b>
        </Text>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Use words people would search for when looking for your item" />
          </Form.Item>

          <Form.Item label="Item Specifics">
            <Form.Item
              name="location"
              label="Location"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "8px",
              }}
            >
              <Select placeholder="Select location">
                <Option value="New York">New York</Option>
                <Option value="Los Angeles">Los Angeles</Option>
                <Option value="Chicago">Chicago</Option>
                <Option value="San Francisco">San Francisco</Option>
                <Option value="Washington">Washington</Option>
                <Option value="Dallas">Dallas</Option>
                <Option value="Houston">Houston</Option>
                <Option value="Boston">Boston</Option>
                <Option value="Seattle">Seattle</Option>
                <Option value="Philadelphia">Philadelphia</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="price"
              label="Pricing"
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <InputNumber prefix="$" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="photo"
            label="Upload Photo"
            valuePropName="fileList"
            rules={[{ required: true, message: "Please upload the photo!" }]}
          >
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default Sell;
