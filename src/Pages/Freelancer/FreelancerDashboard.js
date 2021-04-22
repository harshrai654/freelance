import { useState } from "react";
import { Row, Col, Tabs } from "antd";
import ProjectsPage from "./ProjectsPage";
import FreelancerOngoingProjects from "./OngoingProjects";
import FreelancerCompletedProjects from "./CompletedProjects";
const { TabPane } = Tabs;

const FreelancerDashboard = (props) => {
  const { token, user, setToken } = props;
  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="0" tabPosition="left">
          <TabPane tab={"All Projects"} key={0}>
            <ProjectsPage setToken={setToken} freelancer={user} />
          </TabPane>
          <TabPane tab={"Ongoing Projects"} key={1}>
            <FreelancerOngoingProjects setToken={setToken} freelancer={user} />
          </TabPane>
          <TabPane tab={"Completed Projects"} key={2}>
            <FreelancerCompletedProjects setToken={setToken} freelancer={user} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default FreelancerDashboard;
