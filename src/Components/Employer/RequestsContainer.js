import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import utils from "../../utils";
import { Collapse } from "antd";
import RequestList from "./RequestList";
const { Panel } = Collapse;

const RequestsContainer = (props) => {
  const [projectsList, setProjectsList] = useState([]);
  const { token, user, setUserData } = props;
  useEffect(() => {
    utils
      .getProjectsList({ token, user })
      .then((res) => {
        setProjectsList(res.data.data);
      })
      .catch((err) => {
        utils.logout();
        setUserData({ user: null, token: null });
        setProjectsList(-1);
      });
  }, [token, user]);
  return (
    <>
      {projectsList === -1 ? (
        <Redirect to="/" />
      ) : (
        projectsList &&
        projectsList.length && (
          <Collapse accordion>
            {projectsList.map((project, index) => (
              <Panel header={project.description} key={project._id}>
                <RequestList project={project} token={token} user={user} />
              </Panel>
            ))}
          </Collapse>
        )
      )}
    </>
  );
};

export default RequestsContainer;
