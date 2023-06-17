import React from "react";
import { Typography, Space } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
const Footer = ({ isMobile }) => {
  return (
    <div
      className={`footer border ${
        isMobile ? "!bg-blue-800/80" : "!bg-gray-800"
      }`}
      style={{ backgroundColor: "rgb(8, 14, 20)" }}
    >
      <Title level={4} className="!text-white">
        Online Clinic &reg;
      </Title>
      <Space>
        <Link to="/" className="font-medium text-white underline">
          Home
        </Link>
        <Link to="/ratings" className="font-medium text-white underline">
          Ratings
        </Link>
        <Link to="/feedbacks" className="font-medium text-white underline">
          Feedbacks
        </Link>
        <Link to="/doctors" className="font-medium text-white underline">
          Doctors
        </Link>
      </Space>
    </div>
  );
};

export default Footer;
