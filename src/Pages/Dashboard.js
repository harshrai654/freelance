import { useState } from "react";
import { Row, Col, Tabs } from "antd";
import AddProjectForm from "../Components/AddProjectForm";
import ProjectsAdded from "../Components/ProjectsAdded";
const { TabPane } = Tabs;

const Dashboard = (props) => {
  const { token, user, setToken } = props;
  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="0" tabPosition="left">
          <TabPane tab={"Create Project"} key={0}>
            <AddProjectForm token={token} user={user} />
          </TabPane>
          <TabPane tab={"Update Project"} key={1}>
            <ProjectsAdded token={token} user={user} setToken={setToken} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Dashboard;
