import { useState } from "react";
import { Row, Col, Tabs } from "antd";
import AddProjectForm from "../../Components/Employer/AddProjectForm";
import ProjectsAdded from "../../Components/Employer/ProjectsAdded";
import RequestsContainer from "../../Components/Employer/RequestsContainer";
import ProgressContainer from "../../Components/Employer/ProgressContainer";
const { TabPane } = Tabs;

const Dashboard = (props) => {
  const { token, user, setUserData } = props;
  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="0" tabPosition="left">
          <TabPane tab={"Create Project"} key={0}>
            <AddProjectForm token={token} user={user} />
          </TabPane>
          <TabPane tab={"Update Project"} key={1}>
            <ProjectsAdded
              token={token}
              user={user}
              setUserData={setUserData}
            />
          </TabPane>
          <TabPane tab={"Project Requests"} key={2}>
            <RequestsContainer
              token={token}
              user={user}
              setUserData={setUserData}
            />
          </TabPane>
          <TabPane tab={"Ongoing Projects"} key={3}>
            <ProgressContainer
              token={token}
              user={user}
              setUserData={setUserData}
            />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Dashboard;
