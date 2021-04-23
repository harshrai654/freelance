import { useState } from "react";
import { Row, Col, Tabs } from "antd";
import ProjectsPage from "./ProjectsPage";
import FreelancerOngoingProjects from "./OngoingProjects";
import FreelancerCompletedProjects from "./CompletedProjects";
import FreelancerAppliedProjects from "./AppliedProjects";

const { TabPane } = Tabs;

const FreelancerDashboard = (props) => {
  const { token, user, setUserData } = props;
  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="0" tabPosition="left">
          <TabPane tab={"All Projects"} key={0}>
            <ProjectsPage setUserData={setUserData} freelancer={user} />
          </TabPane>
          <TabPane tab={"Ongoing Projects"} key={1}>
            <FreelancerOngoingProjects setUserData={setUserData} freelancer={user} />
          </TabPane>
          <TabPane tab={"Completed Projects"} key={2}>
            <FreelancerCompletedProjects setUserData={setUserData} freelancer={user} />
          </TabPane>
          <TabPane tab={"Applied Projects"} key={3}>
            <FreelancerAppliedProjects setUserData={setUserData} freelancer={user} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default FreelancerDashboard;
