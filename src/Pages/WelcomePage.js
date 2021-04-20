import { Row, Col, Image } from "antd";

const WelcomePage = () => {
  return (
    <Row>
      <Col span={24}>
        <Image src="/banner.png" preview={false} />
      </Col>
    </Row>
  );
};

export default WelcomePage;
