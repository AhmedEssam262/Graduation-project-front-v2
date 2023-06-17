import React from "react";
import { Spin } from "antd";
const Loader = ({ height }) => {
  return (
    <div>
      <Spin
        size="large"
        style={{
          height: `${height || "fit-content"}`,
          margin: "50px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default Loader;
