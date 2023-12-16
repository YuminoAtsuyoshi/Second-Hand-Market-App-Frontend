import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";
import "../style.css";

function Login({
  externalVisible,
  onExternalCancel,
  onSuccess,
  showButton = true,
}) {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCancel = () => {
    if (externalVisible !== undefined) {
      // 如果有外部控制的visible属性，则调用外部的取消函数
      onExternalCancel();
    } else {
      // 否则使用内部状态关闭Modal
      setDisplayModal(false);
    }
  };

  const onFinish = (data) => {
    login(data)
      .then(() => {
        setDisplayModal(false);
        message.success("Welcome back");
        onSuccess();
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      {showButton && (
        <Button
          className="button-align"
          shape="round"
          onClick={() => setDisplayModal(true)}
          style={{ marginRight: "20px" }}
        >
          Login
        </Button>
      )}
      <Modal
        title="Log in"
        visible={externalVisible !== undefined ? externalVisible : displayModal} // 外部控制的visible优先
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form name="normal_login" onFinish={onFinish} preserve={false}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
