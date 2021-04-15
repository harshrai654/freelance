import React, { useState } from "react";
import { Modal, Form, Input, Alert, Select } from "antd";
import utils from "../utils";

const { Option } = Select;

const RegisterForm = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title="Registration"
        visible={props.registerFormState}
        confirmLoading={confirmLoading}
        cancelText="Close"
        okText="Register"
        onCancel={props.handleClose}
        destroyOnClose
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              setConfirmLoading(true);
              form.resetFields();

              //Register user
              const onRegister = utils.register(values);
              if (onRegister) {
                onRegister
                  .then((res) => {
                    setConfirmLoading(false);
                    if (res.status === 400) {
                      setError(true);
                    } else {
                      const data = res.data;
                      if (data.error) {
                        setError(true);
                      } else {
                        setError(false);
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
        {error && <Alert message="Email already exist" type="error" />}
        <br />
        <Form form={form} name="reg">
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your First name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your Last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile number"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please input your Mobile number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ethereum Address"
            name="ethereum_address"
            rules={[
              {
                required: true,
                message: "Please input your Ethereum Wallet Address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
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
              {
                min: 8,
                message: "Password should be 8 characters long",
              },
              () => ({
                validator(_, value) {
                  let check = new Array(4).fill(false);
                  let count = check.length;

                  for (let i = 0; i < value.length; i++) {
                    if (!check[0] && /[a-z]/.test(value[i])) {
                      check[0] = true;
                      count--;
                    } else if (!check[1] && /[A-Z]/.test(value[i])) {
                      check[1] = true;
                      count--;
                    } else if (!check[2] && /\d/.test(value[i])) {
                      check[2] = true;
                      count--;
                    } else if (
                      !check[3] &&
                      /[!@#$%^&*()_+-=`~/.,\\|[\]{}";:'<>]/.test(value[i])
                    ) {
                      check[3] = true;
                      count--;
                    }
                  }

                  if (count)
                    return Promise.reject(
                      `Password should contain atleast \n 1 lower and upper case alphabet, 1 digit and atleast 1 special character!`
                    );
                  return Promise.resolve();
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            hasFeedback
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select your role">
              <Option value={1}>FreeLancer</Option>
              <Option value={2}>Employer</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default RegisterForm;
