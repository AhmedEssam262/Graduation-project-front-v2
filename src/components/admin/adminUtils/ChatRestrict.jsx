import React, { useEffect, useState } from "react";
import { useChatContext } from "../../../contexts/ChatContextProvider";
import Cookies from "universal-cookie";
import Loader from "../../Loader";
import { Avatar, Empty, Switch, Tag } from "antd";
import doctorPhoto from "../../../images/doctorPhoto.png";
import userPhoto from "../../../images/userPhoto.png";
import changeState from "../adminServices/changeState";
import { useUserContext } from "../../../contexts/UserContextProvider";
const chats = Array.from({ length: 60 }).map((val, i) => ({
  user_id: i,
  nick_name: `waleed ${i}`,
  user_type: `${i % 2 ? "user" : "doctor"}`,
}));
const ChatRestrict = ({ userid }) => {
  const { fetchChatData, chatData, isLoading } = useChatContext();
  const [isRestLoading, setIsLoading] = useState();
  const { fetchUserData, messageApi } = useUserContext();
  useEffect(() => {
    fetchChatData(true, new Cookies().get("accessToken"), { userid });
  }, []);
  return isLoading ? (
    <Loader />
  ) : chats?.length ? (
    <div
      className="overflow-auto mt-2 p-2 flex flex-col gap-2 text-white scroll--v scroll--h"
      style={{
        maxHeight: "55vh",
      }}
    >
      {chatData?.map(({ user_id, img_url, nick_name, user_type, is_open }) => (
        <div key={user_id} className="bg-gray-600 p-2 rounded-md shadow-md">
          <div className="flex flex-wrap justify-between items-center gap-1">
            <div
              className="flex gap-2 bg-gray-700/60 border-r-2 border-gray-100 
            rounded-bl-md rounded-tl-md shadow-md py-1 pr-3 items-center"
            >
              <Avatar
                src={
                  img_url || (user_type == "doctor" ? doctorPhoto : userPhoto)
                }
              />
              <div className="font-medium">{nick_name}</div>
            </div>
            <Switch
              checked={is_open}
              onChange={(is_open) => {
                changeState(
                  fetchUserData,
                  fetchChatData,
                  messageApi,
                  setIsLoading,
                  "restrict",
                  {
                    chat_from: userid,
                    chat_to: user_id,
                    is_open,
                  },
                  true
                );
              }}
              checkedChildren={<span className="font-medium">Close Chat</span>}
              unCheckedChildren={<span className="font-medium">Open Chat</span>}
            />
            <Tag color={is_open ? "blue" : "red"}>
              <span className="font-medium">
                {is_open ? "OPENED" : "CLOSED"}
              </span>
            </Tag>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Empty
      className="!flex !flex-col !justify-center !items-center"
      description={
        <span className="font-medium">There's no connections yet</span>
      }
    />
  );
};

export default ChatRestrict;
