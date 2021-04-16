import { Card, Tag, Collapse } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const ProjectCard = (props) => {
  const proj = props.proj;
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
        </Panel>
      </Collapse>
    </Card>
  );
};

export default ProjectCard;
