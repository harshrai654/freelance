import { Card, Tag, Collapse, Button } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import utils from "../utils";

const { Panel } = Collapse;
const ProjectCard = (props) => {
  const proj = props.proj;
  const freelancer = props.freelancer;
  const token = props.token;

  const apply = (projectID)=>{
    console.log(projectID, freelancer, token);
    utils
      .applyProject(projectID, freelancer, token)
      .then((response)=>{
        console.log(response);
      })
      .catch((err)=>{
        console.log(err);
      });
  };

  return (
    <Card hoverable>
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
          <Button type="primary" onClick={(e)=>apply(proj._id)}>Apply</Button>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default ProjectCard;
