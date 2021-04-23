import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import ProjectCard from "../../Components/Freelancer/ProjectCard";
import utils from "../../utils";

const ProjectsPage = (props) => {
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState({});
  const token = props.token ? props.token : utils.getToken();
  const freelancer = props.freelancer;

  useEffect(() => {
    utils
      .fetchProjects(token)
      .then((data) => {
        setProjects(data.data.filter((proj) => proj.assigned === false));
      })
      .catch((err) => {
        props.setUserData({ user: null, token: null });
        utils.logout();
        setProjects(null);
      });

    utils
      .getFreelancerAppliedProjects(freelancer.id, token)
      .then((res) => {
        const hash = {};
        res.data.data.forEach((req) => {
          hash[req.project] = true;
        });
        setRequests(hash);
      })
      .catch((err) => {
        props.setUserData({ user: null, token: null });
        utils.logout();
        setRequests({});
      });
  }, [token, props]);

  return (
    <>
      {projects && Array.isArray(projects) ? (
        <Row>
          <Col span={24}>
            {projects.map(
              (proj) =>
                !requests[proj._id] && (
                  <ProjectCard
                    proj={proj}
                    freelancer={freelancer.id}
                    token={token}
                    key={proj._id}
                  />
                )
            )}
          </Col>
        </Row>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default ProjectsPage;
