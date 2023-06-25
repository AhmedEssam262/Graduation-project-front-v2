import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ServerError = ({ message, extra, errorTitle }) => {
  return (
    <Result
      className="m-auto"
      status="500"
      title="500"
      subTitle={
        <span className="font-medium text-2xl text-gray-700">
          {errorTitle
            ? `Cannot Get ${errorTitle} Write Now !!`
            : message || "Sorry, something went wrong."}
        </span>
      }
      extra={extra ? <Link to="/">Back Home</Link> : null}
    />
  );
};

export default ServerError;
