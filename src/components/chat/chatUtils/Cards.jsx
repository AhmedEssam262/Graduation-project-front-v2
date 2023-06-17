import { HomeOutlined } from "@ant-design/icons";
import { Avatar, Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const UserCard = ({ imgUrl, name, isMobile, active }) => (
  <div className="p-1 text-center">
    <Avatar src={imgUrl} style={{ backgroundColor: "#f56a00" }} alt="U" />
    <div
      style={{
        maxWidth: "110px",
        minWidth: "80px",
      }}
      className={`break-all overflow-hidden font-medium text-ellipsis mt-1 ${
        !isMobile ? (active ? "text-white" : "text-gray-700") : "text-gray-700 "
      }`}
    >
      {name}
    </div>
  </div>
);
const Cards = ({ isMobile, chatData, setWithUser, withUser, userId }) => {
  const [element, setElement] = useState();
  useEffect(() => {
    setElement(document?.getElementsByClassName("user--item")?.[0]);
  }, [isMobile, chatData]);
  return isMobile ? (
    <div
      style={{
        height: "83.7px",
      }}
      className={`wrapper shrink-0 flex gap-2 items-center bg-gray-600 p-2`}
    >
      <Link
        to="/"
        className="bg-gray-700 hover:!bg-gray-800 p-2 rounded-lg border"
      >
        <HomeOutlined className="flex jusyify-center items-center text-4xl !text-gray-100" />
      </Link>
      <div className="w-0.5 h-full bg-gray-700"></div>
      <div className="overflow-auto scroll--v scroll--h scroll--h--chat">
        <Segmented
          className="user--segment !bg-gray-100"
          size="small"
          value={withUser}
          options={chatData?.map(({ user_id, img_url, nick_name }) => ({
            label: (
              <UserCard
                isMobile={isMobile}
                imgUrl={img_url}
                name={user_id === userId ? "ME" : nick_name}
                active={withUser == user_id}
              />
            ),
            value: user_id,
          }))}
          onChange={(val) => setWithUser(val)}
        />
      </div>
    </div>
  ) : (
    <div className="bg-gray-100 h-full relative border-r overflow-auto scroll--v scroll--v--chat bg-gray-200 border-gray-400">
      <div className="bg-white">
        {withUser && (
          <div
            style={{
              height: `${element?.clientHeight}px`,
              top: `${
                element?.offsetHeight *
                chatData?.findIndex(({ user_id }) => user_id == withUser)
              }px`,
              transition: "top 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
            }}
            className="absolute w-full p-1"
          >
            <div className="bg-gray-700 rounded-lg w-full h-full"></div>
          </div>
        )}
        {chatData?.map(({ user_id, nick_name, img_url }, i) => (
          <div
            className={`p-2 ${
              user_id !== withUser && "hover:bg-gray-100"
            } select-none flex gap-2 relative user--item cursor-pointer border-b border-gray-400`}
            key={user_id}
            onClick={() => setWithUser(user_id)}
          >
            <UserCard
              active={withUser == user_id}
              isMobile={isMobile}
              imgUrl={img_url}
              name={user_id === userId ? "ME" : nick_name}
            />
            <div
              style={{
                maxWidth: "140px",
              }}
              className="flex items-center border-l border-gray-400/80 pl-2"
            >
              <span
                className={`truncate text-gray-500 ${
                  withUser == user_id && "text-gray-100"
                }`}
              >
                content sfkfkdjflskdjknfdfdjfdfj {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
