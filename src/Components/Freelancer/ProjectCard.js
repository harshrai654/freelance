import { Card, Tag, Collapse, Button, Alert, Modal, Spin } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import utils from "../../utils";
import { useEffect, useState } from "react";

const { confirm } = Modal;
const { Panel } = Collapse;
const ProjectCard = (props) => {
  const freelancer = props.freelancer;
  const token = props.token;
  const [successAlert, setSuccessAlert] = useState(-1);
  const [loading, setLoading] = useState(-1);
  const [proj, setProj] = useState(props.proj);

  const apply = (projectID) => {
    utils
      .applyProject(projectID, freelancer, token)
      .then((response) => {
        setSuccessAlert(1);
      })
      .catch((err) => {
        setSuccessAlert(0);
      });
  };

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to Delete this application request?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        setLoading(0);
        utils
          .deleteApplyRequest(props.proj, token)
          .then(() => {
            console.log(props.proj);
            props.deleteRequest();
            setLoading(1);
          })
          .catch((err) => {
            setLoading(2);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    if (props.applied) {
      utils.getProject(proj.project, token).then((res) => {
        setProj(res.data.data);
      });
    }
  });

  return (
    <>
      {loading === 1 && (
        <Alert
          message="Request deleted successfully"
          type="success"
          closable
          onClose={() => setLoading(-1)}
        />
      )}
      {loading === 2 && (
        <Alert
          message="Something went wrong!"
          type="error"
          closable
          onClose={() => setLoading(-1)}
        />
      )}
      <Card hoverable>
        {successAlert == 1 && (
          <Alert closable message="Applied successfully!" type="success" />
        )}
        {successAlert == 0 && (
          <Alert
            closable
            message="Something went wrong!"
            type="error"
            onClose={() => setSuccessAlert(-1)}
          />
        )}
        <Tag
          icon={
            !proj.assigned ? (
              <CheckCircleOutlined />
            ) : (
              <ExclamationCircleOutlined />
            )
          }
          color={proj.assigned ? "warning" : "success"}
        >
          {!proj.assigned ? "Available" : "Assigned"}
        </Tag>
        <Tag>{`Amount ₹${proj.amount}`}</Tag>
        <Tag>{`Duration (Days): ${proj.deadline}`}</Tag>
        <Collapse>
          <Panel header="Project Description" key="1">
            <p>{proj.description}</p>
            {props.applied ? (
              !loading ? (
                <Spin />
              ) : (
                <Button
                  type="danger"
                  onClick={showConfirm}
                  disabled={proj.assigned}
                >
                  Cancel Request
                </Button>
              )
            ) : (
              <Button
                type="primary"
                disabled={proj.assigned || successAlert === 1}
                onClick={(e) => apply(proj._id)}
              >
                {props.applied ? "Applied" : "Apply"}
              </Button>
            )}
          </Panel>
        </Collapse>
      </Card>
    </>
  );
};

export default ProjectCard;
