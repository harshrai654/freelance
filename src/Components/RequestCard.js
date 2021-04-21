import { Card, Tag, Collapse, Button } from "antd";

const { Panel } = Collapse;
const RequestCard = (props) => {
  const request = props.request;
  
  return (
    <Card hoverable>
        <Tag>{`Date: ${request.createdAt}`}</Tag>
        <Collapse></Collapse>
        <Panel header={`Freelancer: ${request.freelancer}`} key={request._id}>
          <Button type="primary">Lock</Button>
        </Panel>
    </Card>
  );
};

export default RequestCard;
