import { Form, Input, Spin, InputNumber, Button, Alert } from "antd";
import { useState } from "react";
import utils from "../utils";

const getStatusComponent = (status) => {
  switch (status) {
    case -1:
      return (
        <Button type="primary" htmlType="submit">
          Add Project
        </Button>
      );
    case 0:
      return <Spin />;
    case 1:
      return <Alert message="Something went wrong!" type="error" />;
    case 2:
      return <Alert message="Project Added successfully!" type="success" />;
    default:
      return <Spin />;
  }
};

const AddProjectForm = (props) => {
  const [status, setStatus] = useState(-1);
  const { token, user } = props;
  return (
    <Form
      layout="vertical"
      onFinish={(values) => {
        setStatus(0);
        utils
          .addProject({ values, token, user })
          .then((res) => {
            setStatus(2);
          })
          .catch((err) => {
            setStatus(1);
          });
      }}
    >
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input project description!",
          },
        ]}
      >
        <Input.TextArea style={{ height: "200px" }} />
      </Form.Item>
      <Form.Item
        label="Amount ₹"
        name="amount"
        type="number"
        rules={[{ required: true, message: "Please enter amount!" }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Duration(Days)"
        name="deadline"
        type="number"
        rules={[{ required: true, message: "Please enter project duration" }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <br />

      <Form.Item>{getStatusComponent(status)}</Form.Item>
    </Form>
  );
};

export default AddProjectForm;
