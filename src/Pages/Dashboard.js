import { useState } from "react";
import { Row, Col, Tabs } from "antd";
import AddProjectForm from "../Components/AddProjectForm";
const { TabPane } = Tabs;

const Dashboard = (props) => {
  const { token, user } = props;
  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab={"Create Project"}>
            <AddProjectForm token={token} user={user} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Dashboard;
