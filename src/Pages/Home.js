import { Row } from "antd";
import Header from "../Components/Header";
const Home = () => {
  return (
    <>
      <Row>
        <Header isLoggedIn={false} />
      </Row>
    </>
  );
};

export default Home;
