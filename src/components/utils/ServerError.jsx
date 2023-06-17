import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ServerError = ({ message }) => {
  return (
    <Result
      status="500"
      title="500"
      subTitle={
        <span className="font-medium text-2xl text-gray-700">
          {"Sorry, something went wrong." || message}
        </span>
      }
      extra={<Link to="/">Back Home</Link>}
    />
  );
};

export default ServerError;
