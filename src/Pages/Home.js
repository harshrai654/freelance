import { Row, Col } from "antd";
import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../Components/Header";
import utils from "../utils";
import ProjectsPage from "./ProjectsPage";
import WelcomePage from "./WelcomePage";
import Dashboard from "./Dashboard";

const Home = () => {
  const [token, setToken] = useState(utils.getToken());
  const [user, setUser] = useState(utils.getUser());
  return (
    <>
      <Row>
        <Header isLoggedIn={token} setToken={setToken} setUser={setUser} />
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
                <ProjectsPage setToken={setToken} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/dashboard">
              {token && user.type === "employer" ? (
                <Dashboard setToken={setToken} />
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
