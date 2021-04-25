import { useState } from "react";
import { Modal, Button, Form, Input, Alert, InputNumber } from "antd";
import utils from "../../utils";

const PaymentRequestForm = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState(false);
  const title = "Payment Request";
  return (
    <>
      <Modal
        title={title}
        visible={props.showPaymentForm}
        confirmLoading={confirmLoading}
        cancelText="Close"
        okText="Make Request"
        onCancel={props.handleClose}
        onOk={() => {
          console.log("Send payment request to blockchain");
        }}
      >
        {error && <Alert message="Something went wrong!" type="error" />}
        <br />
        <Form name={title}>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                type: "text",
                message: "Please input request description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount ₹"
            name="amount"
            type="number"
            rules={[
              { required: true, message: "Please enter payment amount!" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PaymentRequestForm;
