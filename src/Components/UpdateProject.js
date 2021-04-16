import { useState } from "react";
import { Form, Input, Button, InputNumber, Spin, Alert, Tag } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import utils from "../utils";

const UpdateProject = (props) => {
  let { project, token } = props;
  const [loading, setLoading] = useState(-1);
  return (
    <>
      {loading === 1 && (
        <Alert
          message="Project updated successfully"
          type="success"
          closable
          onClose={() => setLoading(-1)}
        />
      )}
      {loading === 2 && (
        <Alert
          message="Something went wrong!"
          type="error"
          closable
          onClose={() => setLoading(-1)}
        />
      )}
      {project.assigned && (
        <Tag icon={<MinusCircleOutlined />} color="default">
          Ongoing project
        </Tag>
      )}
      <Form
        initialValues={project}
        onFinish={(pro) => {
          pro = { ...project, ...pro };

          setLoading(0);
          utils
            .updateProject(pro, token)
            .then((res) => {
              if (res.status === 403) {
                setLoading(2);
              } else {
                props.setProject(pro);
                setLoading(1);
              }
            })
            .catch((err) => {
              console.error(err);
              setLoading(2);
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
          <Input.TextArea
            disabled={project.assigned}
            defaultValue={project.description}
            style={{ height: "200px" }}
          />
        </Form.Item>
        <Form.Item
          label="Amount ₹"
          name="amount"
          type="number"
          rules={[{ required: true, message: "Please enter amount!" }]}
        >
          <InputNumber
            min={0}
            defaultValue={project.amount}
            disabled={project.assigned}
          />
        </Form.Item>
        <Form.Item
          label="Duration(Days)"
          name="deadline"
          type="number"
          rules={[{ required: true, message: "Please enter project duration" }]}
        >
          <InputNumber
            min={1}
            defaultValue={project.deadline}
            disabled={project.assigned}
          />
        </Form.Item>
        <br />
        <Form.Item>
          {loading && (
            <Button
              type="primary"
              htmlType="submit"
              disabled={project.assigned}
            >
              Submit
            </Button>
          )}
          {!loading && <Spin />}
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateProject;
