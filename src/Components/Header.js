/* eslint-disable react/react-in-jsx-scope */
import { PageHeader } from "antd";
import AuthController from "../Components/AuthController";

const Header = (props) => {
  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="DeLancer"
      extra={[
        <AuthController
          key={0}
          setToken={props.setToken}
          setUser={props.setUser}
          isLoggedIn={props.isLoggedIn}
        />,
      ]}
    />
  );
};

export default Header;
