import { useEffect, useState } from "react";
import { Modal, Button } from "antd";

const AuthForm = (props) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={props.type}
        onOk={props.handleClose}
        onCancel={props.handleClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default AuthForm;
