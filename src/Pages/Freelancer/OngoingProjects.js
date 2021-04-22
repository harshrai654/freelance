import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import ProjectCard from "../../Components/Freelancer/ProjectCard";
import utils from "../../utils";

const OngoingProjects = (props) => {
  const [projects, setProjects] = useState([]);
  const token = props.token ? props.token : utils.getToken();
  const freelancer = props.freelancer;

  useEffect(() => {
    utils
      .getFreelancerProjects(freelancer.id, token)
      .then((data) => {
        setProjects(data.data.filter(proj=>proj.status === "PENDING"));
      })
      .catch((err) => {
        props.setToken(null);
        setProjects(null);
      });
  }, [token, props]);

  return (
    <>
      {projects && Array.isArray(projects) ? (
        <Row>
          <Col span={24}>
            {projects.map((proj) => (
              <ProjectCard proj={proj} freelancer={freelancer.id} token={token} key={proj._id} />
            ))}
          </Col>
        </Row>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default OngoingProjects;
