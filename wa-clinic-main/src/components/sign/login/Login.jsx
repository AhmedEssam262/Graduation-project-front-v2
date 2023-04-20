import React, { useEffect } from "react";
import { Checkbox, Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import HeaderLine from "../signup/signupUtils/HeaderLine";
import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import Cookies from "universal-cookie";
const getMessage = (key, type, content, duration) => ({
  key,
  type,
  content,
  duration,
});

const signing = (
  values,
  messageApi,
  setValidState,
  navigate,
  fetchUserData,
  location
) => {
  messageApi.open(getMessage(1, "loading", "verfying...", 8));
  const host = window?.location?.hostname;
  console.log(values);
  delete values?.remember;
  axios
    .post(
      `http://127.0.0.1:8000/api/login`,
      {
        data: values,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        //withCredentials: true,
      }
    )
    .then(({ data }) => {
      const cookies = new Cookies();
      if (data?.data?.token) cookies.set("accessToken", data?.data?.token);
      messageApi.open(getMessage(1, "success", "login successfully", 2));
      setTimeout(() => {
        const loc = new URLSearchParams(location?.search)?.get("redirect");
        navigate(loc ? loc : "/");
        fetchUserData(true, cookies.get("accessToken"));
      }, 2000);
    })
    .catch((err) => {
      const { isExist, isVerified } = err?.response?.data?.data || {};
      if (isExist == 0) {
        // bad request, name not exist
        messageApi.open(getMessage(1, "error", "invalid username", 2));
        setValidState((state) => ({ ...state, invalidUser: 1 }));
        // setValidState("error");
      } else if (isVerified == 0) {
        messageApi.open(getMessage(1, "error", "incorrect password", 2));
        setValidState((state) => ({ ...state, invalidPass: 1 }));
      } else {
        messageApi.open(
          getMessage(1, "error", "there's some issues, try again later", 2)
        );
        setValidState({ invalidUser: 0, invalidPass: 0 });
      }
    });
};
const Login = ({ isTokenExpired, fetchUserData, user }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [validState, setValidState] = useState({
    invalidUser: 0,
    invalidPass: 0,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { Item } = Form;
  const isMobile = useMediaQuery({
    query: "(max-width:778px)",
  });
  useEffect(() => {
    if (user?.user_id) return navigate("/");
  }, []);
  const [formValues, setFormValues] = useState(null);
  return (
    <div
      className="form--in--wrapper grow"
      style={{
        background:
          "linear-gradient(to top right, rgb(32 58 89 / 90%), #a1858bff)",
      }}
    >
      {contextHolder}
      <div
        className="p-10 grow
      flex justify-start mt-20 flex-col items-center"
      >
        <HeaderLine
          value="Login"
          center
          invisible
          size="no"
          classText="text-5xl xl:text-6xl"
          style={{ color: "white", marginBottom: "65px" }}
          lineStyle={{ marginBottom: "65px" }}
        />
        {isTokenExpired && (
          <Title level={5} className=" !text-red-400 !text-xs">
            Your Time Has Expired, you can sign-in again
          </Title>
        )}
        <Form
          name="entry"
          colon={false}
          size="large"
          className="w-full sm:w-4/5 lg:w-1/2 2xl:w-1/3 !bg-transparent"
          initialValues={{ remember: false }}
          autoComplete="on"
          onFinish={(val) =>
            signing(
              val,
              messageApi,
              setValidState,
              navigate,
              fetchUserData,
              location
            )
          }
          // onFinish={(values)=>console.log("sccuss",values)}
          // onFinishFailed={(errvalues)=>console.log("fail",errvalues)}
          onValuesChange={(c, values) => {
            setFormValues(values);
            setValidState({ invalidUser: 0, invalidPass: 0 });
          }}
        >
          <Item
            name="username"
            validateStatus={validState.invalidUser ? "error" : ""}
            help={
              validState.invalidUser ? `be sure you write correct user` : null
            }
            // hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                pattern: "^([A-Z]|[a-z])+.{0,22}$",
                message: "must begin with letters and max 22 character",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="username" />
          </Item>
          <Item
            name="password"
            validateStatus={validState.invalidPass ? "error" : ""}
            help={
              validState.invalidPass
                ? `incorrect password, you can ask for help`
                : null
            }
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                message: `Minimum eight and maximum 12 characters, at least 
              one uppercase letter, one lowercase letter  `,
                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Item>
          <Item name="remember" valuePropName="checked">
            <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
          </Item>
          <Item>
            <Button
              type="primary"
              className="w-full !border !border-white"
              htmlType="submit"
            >
              Submit
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;