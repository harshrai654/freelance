import { useState, useEffect } from "react";
import { List, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import utils from "../../utils";

const RequestList = (props) => {
  const [requestList, setRequestList] = useState([]);
  const { token, user, project } = props;

  useEffect(() => {
    utils
      .fetchApplyRequests(project._id, token)
      .then((res) => {
        setRequestList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setRequestList([]);
        props.setUserData({ user: null, token: null });
      });
  }, [token]);

  return (
    <List
      bordered
      itemLayout="horizontal"
      dataSource={requestList}
      renderItem={(item) => (
        <List.Item
          key={item._id}
          actions={[
            <Link href="#">Know More</Link>,
            <Button onClick={() => props.selectRequest(item)}>
              Accept Request
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={`FreeLancer: ${item.freelancer}`}
            description={`Date:${item.createdAt}`}
          />
        </List.Item>
      )}
    />
  );
};

export default RequestList;
