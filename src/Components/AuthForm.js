import { useState } from "react";
import { Modal, Button, Form, Input, Alert } from "antd";
import jwt from "jsonwebtoken";
import utils from "../utils";

const AuthForm = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form] = Form.useForm();
  const title = props.type === 1 ? "Login" : "Employer Login";
  return (
    <>
      <Modal
        title={title}
        visible={props.type}
        confirmLoading={confirmLoading}
        cancelText="Close"
        okText="Login"
        onCancel={props.handleClose}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              setConfirmLoading(true);
              form.resetFields();

              const onLogin = utils.login(props.type, values);
              if (onLogin) {
                onLogin
                  .then((res) => {
                    setConfirmLoading(false);
                    if (res.status === 400) setError(true);
                    else {
                      const data = res.data;
                      if (data.error) {
                        setError(true);
                      } else {
                        setError(false);
                        const user = jwt.decode(data.data.token);
                        utils.saveToken({ token: data.data.token, user });
                        props.setToken(data.data.token);
                        props.setUser(user);
                        props.handleClose();
                      }
                    }
                  })
                  .catch((err) => {
                    setError(true);
                    setConfirmLoading(false);
                  });
              }
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        {error && <Alert message="Invalid Email or password" type="error" />}
        <br />
        <Form form={form} name={title}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        <Button
          type="text"
          onClick={() => {
            props.setRegisterFormState(1);
            props.handleClose();
          }}
        >
          Register
        </Button>
      </Modal>
    </>
  );
};

export default AuthForm;
