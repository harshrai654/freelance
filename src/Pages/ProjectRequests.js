import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Row, Col } from "antd";
import RequestCard from "../Components/RequestCard";
import utils from "../utils";

const ProjectRequests = (props) => {
  const [requests, setRequests] = useState([]);
  const token = props.token ? props.token : utils.getToken();
  const employer = props.employer;
  const {id} = useParams();
  useEffect(() => {
    utils
      .fetchApplyRequests(id, token)
      .then((res) => {
        setRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err)
        props.setToken(null);
        setRequests(null);
      });
  }, [token, props]);

  return (
    <>
      {requests && Array.isArray(requests) ? (
        <Row>
          <Col span={24}>
            {requests.map((request) => (
              <RequestCard request={request} key={request._id} />
            ))}
          </Col>
        </Row>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default ProjectRequests;
