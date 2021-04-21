/* eslint-disable react/react-in-jsx-scope */
import { PageHeader } from "antd";
import AuthController from "../Components/AuthController";

const Header = (props) => {
  return (
    <PageHeader
      ghost={false}
      title="DeLancer"
      extra={[
        <AuthController
          key={0}
          setUserData={props.setUserData}
          isLoggedIn={props.isLoggedIn}
        />,
      ]}
    />
  );
};

export default Header;
