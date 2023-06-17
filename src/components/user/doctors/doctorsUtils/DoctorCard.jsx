import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Button,
  Rate,
  Image,
  Segmented,
  Empty,
  Popover,
} from "antd";
import { MessageOutlined, StopOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { SlotsContextProvider } from "../../../../contexts";
import BookCard from "./BookCard";
import dayjs from "dayjs";
const DoctorCard = ({
  profileImage,
  rate,
  specialty,
  fees,
  about,
  username,
  doctorName,
  doctorId,
  user,
}) => {
  const navigate = useNavigate();
  const cardDetails = [
    {
      label: "Specialty",
      value: specialty,
    },
    {
      label: "Fees",
      value: fees,
    },
    {
      label: "About",
      value: about,
    },
  ];
  return (
    <Link
      to={user?.user_name == username ? `/dashboard` : `/profile/${username}`}
      onClick={() => window.localStorage.setItem("dashType", "profile")}
      className="w-1/2 grow !my-2 sm:!m-2 xl:w-1/3 2xl:w-1/4"
    >
      <Card
        className="!p-2"
        hoverable
        // cover={

        // }
        title={
          <div className="flex gap-3 items-center">
            <div
              style={{
                fontSize: "20px",
              }}
              className="font-serif grow text-center whitespace-nowrap"
            >
              {"Dr. "}
              {doctorName || "Doctor"}
            </div>
          </div>
        }
        bodyStyle={{
          padding: "5px",
        }}
        actions={[]}
      >
        <div className="flex flex-col sm:flex-row">
          <SlotsContextProvider>
            <BookCard doctorId={doctorId} />
          </SlotsContextProvider>
          <div className="doctor--details mt-2 flex flex-col justify-between gap-2 grow">
            <div className="doctor--image text-center">
              <Image
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  userSelect: "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                src={profileImage}
              />
              <div className="text-center">
                <Rate value={rate} disabled />
              </div>
            </div>
            <div className="grow">
              {cardDetails?.map(({ label, value }) => (
                <div key={label}>
                  <hr className="border-1 m-2 border-gray-300 shadow-lg" />
                  <div className="font-bold font-mono">
                    <span>{label}: </span>
                    {value ? (
                      <span className="text-blue-800">{value}</span>
                    ) : (
                      <StopOutlined />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* ask a question*/}
            <Popover
              trigger="click"
              open={user ? false : null}
              showArrow={false}
              content={
                <span className="font-medium">
                  you must signup/signin first
                </span>
              }
            >
              <div
                className="!flex !justify-center !items-center !hover:bg-yellow-700 !bg-yellow-500 
          hover:!text-black gap-2
          rounded  !w-full !text-gray-700"
                style={{
                  height: "35px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (doctorId & user?.user_id) {
                    navigate("/chat");
                    window?.localStorage?.setItem("chatTo", doctorId);
                  }
                }}
              >
                <MessageOutlined
                  className="hover:!text-black
            rounded py-2 !text-gray-700"
                />
                <span className="font-medium">Ask your Question</span>
              </div>
            </Popover>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DoctorCard;
