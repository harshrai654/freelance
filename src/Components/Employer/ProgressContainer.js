import { useState, useEffect } from "react";
import { Select, Row, Col, Divider, Button } from "antd";
import utils from "../../utils";
const { Option } = Select;

const ProgressContainer = (props) => {
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
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
      <Row justify="center">
        <Col span={6}>
          <Select
            placeholder="Select project"
            // style={{ width: "20%" }}
            onChange={(value) => {
              setSelectedProject(value);
            }}
          >
            {projectsList.map(
              (project) =>
                project.assigned && (
                  <Option value={project._id}>{project._id}</Option>
                )
            )}
          </Select>
        </Col>
        <Col span={4}>
          <Button disabled={!projectsList}>Show Progress</Button>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default ProgressContainer;
