import { Card, Tag, Collapse, Button, Alert } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import utils from "../../utils";
import { useState } from "react";

const { Panel } = Collapse;
const ProjectCard = (props) => {
  const proj = props.proj;
  console.log(proj)
  const freelancer = props.freelancer;
  const token = props.token;
  const [successAlert, setSuccessAlert] = useState(-1);

  const apply = (projectID) => {
    utils
      .applyProject(projectID, freelancer, token)
      .then((response) => {
        setSuccessAlert(1);
      })
      .catch((err) => {
        setSuccessAlert(0);
      });
  };

  return (
    <Card hoverable>
      {successAlert == 1 && (
        <Alert
          closable
          message="Applied successfully!"
          type="success"
          onClose={() => setSuccessAlert(-1)}
        />
      )}
      {successAlert == 0 && (
        <Alert
          closable
          message="Something went wrong!"
          type="error"
          onClose={() => setSuccessAlert(-1)}
        />
      )}
      <Tag
        icon={
          !proj.assigned ? (
            <CheckCircleOutlined />
          ) : (
            <ExclamationCircleOutlined />
          )
        }
        color={proj.assigned ? "warning" : "success"}
      >
        {!proj.assigned ? "Available" : "Assigned"}
      </Tag>
      <Tag>{`Amount ₹${proj.amount}`}</Tag>
      <Tag>{`Duration (Days): ${proj.deadline}`}</Tag>
      <Collapse>
        <Panel header="Project Description" key="1">
          <p>{proj.description}</p>
          <Button
            type="primary"
            disabled={proj.assigned || props.applied}
            onClick={(e) => apply(proj._id)}
          >
            {props.applied?"Applied":"Apply"}
          </Button>
          <Button type="primary" disabled={proj.freelancer !== freelancer}>
            View
          </Button>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default ProjectCard;
