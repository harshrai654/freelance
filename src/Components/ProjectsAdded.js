import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Collapse } from "antd";
import utils from "../utils";
import UpdateProject from "./UpdateProject";

const { Panel } = Collapse;

const ProjectsAdded = (props) => {
  const [projectsList, setProjectsList] = useState([]);
  const { token, user, setToken } = props;
  useEffect(() => {
    utils
      .getProjectsList({ token, user })
      .then((res) => {
        setProjectsList(res.data.data);
      })
      .catch((err) => {
        utils.logout();
        setToken(null);
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
                <UpdateProject
                  project={project}
                  token={token}
                  setProject={(project) => {
                    let newProductList = [...projectsList];
                    newProductList[index] = project;
                    setProjectsList(newProductList);
                  }}
                />
              </Panel>
            ))}
          </Collapse>
        )
      )}
    </>
  );
};

export default ProjectsAdded;
