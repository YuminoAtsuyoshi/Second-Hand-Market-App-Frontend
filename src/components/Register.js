import { Button, Form, Input, message, Modal, Radio } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "../utils";
import "../style.css";

function Register() {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const signupOnClick = () => {
    setDisplayModal(true);
  };

  const onFinish = (data) => {
    register(data)
      .then(() => {
        setDisplayModal(false);
        message.success("Successfully signed up");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      <Button
        className="button-align"
        shape="round"
        type="primary"
        onClick={signupOnClick}
      >
        Register
      </Button>
      <Modal
        title="Register"
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="age"
            rules={[{ required: true, message: "Please input your age" }]}
          >
            <Input placeholder="Age" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please input your address" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please input your gender" }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="non-binary">Non-binary</Radio>
              <Radio value="n-a">Prefer not to say</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Register;
