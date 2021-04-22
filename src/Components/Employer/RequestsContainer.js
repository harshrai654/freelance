import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import utils from "../../utils";
import { Collapse, Spin, Alert } from "antd";
import RequestList from "./RequestList";
const { Panel } = Collapse;

const RequestsContainer = (props) => {
  const [projectsList, setProjectsList] = useState([]);
  const { token, user, setUserData } = props;
  const [selectedRequest, setSelectedRequest] = useState(-1);
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

  const selectRequest = (project, request, index) => {
    setSelectedRequest(0);
    utils.setAcceptRequest({ project, request, token }).then(() => {
      let newProjectsList = [...projectsList];
      newProjectsList.splice(index, 1);
      setProjectsList(newProjectsList);
      setSelectedRequest(1);
    });
  };

  return (
    <>
      {selectedRequest == 1 && (
        <Alert
          message="Request accepted!"
          type="success"
          closable
          onClose={() => setSelectedRequest(-1)}
        />
      )}
      {projectsList === -1 ? (
        <Redirect to="/" />
      ) : (
        projectsList &&
        projectsList.length && (
          <Collapse accordion>
            {projectsList.map(
              (project, index) =>
                !project.assigned && (
                  <Panel header={project.description} key={project._id}>
                    {selectedRequest == -1 && (
                      <RequestList
                        project={project}
                        token={token}
                        user={user}
                        selectRequest={(request) =>
                          selectRequest(project, request, index)
                        }
                      />
                    )}
                    {selectedRequest == 0 && <Spin />}
                  </Panel>
                )
            )}
          </Collapse>
        )
      )}
    </>
  );
};

export default RequestsContainer;
