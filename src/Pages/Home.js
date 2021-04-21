import { Row, Col } from "antd";
import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../Components/Header";
import utils from "../utils";
import ProjectsPage from "./Freelancer/ProjectsPage";
import WelcomePage from "./WelcomePage";
import Dashboard from "./Employer/Dashboard";
import ProjectRequests from "./Employer/ProjectRequests";

const Home = () => {
  const [userData, setUserData] = useState({
    user: utils.getUser(),
    token: utils.getToken(),
  });
  const { token, user } = userData;
  return (
    <>
      <Row>
        <Header isLoggedIn={token} setUserData={setUserData} />
      </Row>
      <Row>
        <Col span={24}>
          <Switch>
            <Route exact path="/">
              {token ? (
                user.type === "freelancer" ? (
                  <Redirect to="/projects" />
                ) : (
                  <Redirect to="/dashboard" />
                )
              ) : (
                <WelcomePage />
              )}
            </Route>
            <Route exact path="/projects">
              {token && user.type === "freelancer" ? (
                <ProjectsPage setUserData={setUserData} freelancer={user} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/dashboard">
              {token && user.type === "employer" ? (
                <Dashboard
                  token={token}
                  user={user}
                  setUserData={setUserData}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/project/:id">
              {token && user.type === "employer" ? (
                <ProjectRequests
                  token={token}
                  setUserData={setUserData}
                  employer={user}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </Switch>
        </Col>
      </Row>
    </>
  );
};

export default Home;
