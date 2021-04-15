import { useState } from "react";
import { Space, Button } from "antd";
import AuthForm from "./AuthForm";
import RegisterForm from "./RegisterForm";
import utils from "../utils";

const AuthController = (props) => {
  const [userType, setUserType] = useState(0);
  const [registerFormState, setRegisterFormState] = useState(0);
  return (
    <Space>
      {props.isLoggedIn ? (
        <Button
          type="primary"
          onClick={() => {
            utils.logout();
            props.setToken(null);
          }}
        >
          Logout
        </Button>
      ) : (
        <Space>
          <Button type="primary" onClick={() => setUserType(1)}>
            Login
          </Button>
          <Button type="primary" onClick={() => setUserType(2)}>
            Employer Login
          </Button>
          <AuthForm
            type={userType}
            handleClose={() => setUserType(0)}
            setRegisterFormState={setRegisterFormState}
            setToken={props.setToken}
            setUser={props.setUser}
          />
          <RegisterForm
            registerFormState={registerFormState}
            handleClose={() => setRegisterFormState(0)}
          />
        </Space>
      )}
    </Space>
  );
};

export default AuthController;
