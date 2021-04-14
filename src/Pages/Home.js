import { Row } from "antd";
import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../Components/Header";
import utils from "../utils";
import ProjectsPage from "./ProjectsPage";
import WelcomePage from "./WelcomePage";

const Home = () => {
  const [token, setToken] = useState(utils.getToken());
  return (
    <>
      <Row>
        <Header isLoggedIn={token} setToken={setToken} />
      </Row>
      <Row>
        <Switch>
          <Route exact path="/">
            {token ? <Redirect to="/projects" /> : <WelcomePage />}
          </Route>
          <Route exact path="/projects">
            {token ? <ProjectsPage /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Row>
    </>
  );
};

export default Home;
