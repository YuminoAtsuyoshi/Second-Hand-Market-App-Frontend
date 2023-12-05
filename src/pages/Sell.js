import React, { useRef } from "react";
import { Layout, Form, Input, Select, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

function Sell() {
  const fileInputRef = useRef(null);

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
    
  };

  return (
    <Layout style={{ padding: "24px" }}>
      <Content
        className="site-layout-background"
        style={{ padding: 24, margin: 0, height: 800, overflow: "auto" }}
      >
        <h1>Sell Your Item</h1>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title (use words people would search for when looking for your item)"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Item Specifics">
            <Form.Item
              name="condition"
              label="Condition"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "8px",
              }}
            >
              <Select placeholder="Select condition">
                <Option value="new">New</Option>
                <Option value="used">Used</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="brand"
              label="Brand"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "8px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="style"
              label="Style"
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="department"
              label="Department"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "8px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="shipping"
              label="Shipping"
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "8px",
              }}
            >
              <Input />
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
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              name="photo"
              action="/upload.do"
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
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
            <Button type="primary" htmlType="submit">
              Upload
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default Sell;
