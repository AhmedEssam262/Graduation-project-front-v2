import {
  Loading3QuartersOutlined,
  LoadingOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import Cookies from "universal-cookie";
import { useMessagesContext } from "../../../contexts/MessagesContextProvider";
import submitMessage from "../chatServices/submitMessage";
import Message from "./Message";

const Messages = ({
  isMobile,
  fetchUserData,
  withUser,
  user_id,
  messageApi,
  socket,
  isNew,
}) => {
  const { fetchMessagesData, messagesData } = useMessagesContext();
  const [messages, setMessages] = useState([]);
  const messageContainer = useRef(null);
  const [message, setMessage] = useState();
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (withUser)
      fetchMessagesData(
        new Cookies().get("accessToken"),
        {
          message_to: withUser,
        },
        true
      );
    const addMessage = (m1) => {
      setMessages((m) => {
        const m2 = new Array(...(m ? m : []));
        return m2
          ?.splice(m2?.length - 2)
          ?.some(({ message_id }) => m1?.message_id == message_id)
          ? m
          : [...m, m1];
      });
    };
    socket?.on("recieve_message", addMessage);
    return () => {
      socket.off("recieve_message", addMessage);
    };
  }, []);
  useEffect(() => {
    if (withUser && user_id)
      socket?.emit(
        "join_chat",
        `${withUser > user_id ? withUser : user_id},${
          user_id > withUser ? withUser : user_id
        }`
      );
  }, [withUser, user_id]);
  useEffect(() => {
    setMessages(messagesData || []);
  }, [messagesData]);
  // useEffect(() => {
  //   console.log(messageContainer?.current);
  //   if (messageContainer?.current) {
  //     messageContainer?.current?.scrollTo({
  //       top: messageContainer?.current?.firstChild?.offsetHeight,
  //     });
  //   }
  // }, [withUser, messageContainer?.current]);
  return (
    <>
      <div
        ref={messageContainer}
        className="message--container flex flex-col-reverse  border-gray-100 px-4 overflow-auto scroll--v scroll--v--chat"
      >
        <div className="grow">
          {messages?.map(
            ({ content, message_from, issued_date, issued_time }, i, arr) => (
              <div key={i + 1}>
                {arr[i - 1]?.issued_date !== issued_date && (
                  <div
                    className="block w-fit mr-auto ml-auto text-white grow border border-white bg-blue-500/50 
                  rounded-lg text-center py-1 my-2 px-4 font-medium
                  overflow-auto
                  "
                  >
                    {issued_date}
                  </div>
                )}
                <Message
                  key={i + 1}
                  isMobile={isMobile}
                  content={content}
                  me={message_from == user_id}
                  issued_time={issued_time}
                />
              </div>
            )
          )}
        </div>
      </div>
      <div className="bg-gray-100 mt-2 rounded-lg">
        <div className="flex gap-2 items-center p-2">
          <Input
            onChange={(e) => setMessage(e?.target?.value)}
            className="rounded-lg"
            value={message}
          />
          <BsEmojiSmileFill
            onClick={() => setEmojiOpen((val) => !val)}
            className={`!flex cursor-pointer !items-center !text-3xl ${
              emojiOpen ? "!text-green-700" : "!text-green-400"
            }`}
          />
          {/* <div className="flex gap-2 items-center bg-white p-2 rounded-lg shadow-sm">
    <LikeOutlined className="!flex hover:shadow-lg cursor-pointer rounded-full hover:!text-blue-600 items-center !fill-black !text-blue-500 !text-xl" />
    <DislikeOutlined className="!flex hover:shadow-lg cursor-pointer rounded-full hover:!text-yellow-600 items-center !fill-black !text-yellow-500 !text-xl" />
    <BsEmojiAngry className="!flex hover:shadow-lg cursor-pointer rounded-full hover:!text-red-800 items-center !text-red-500 !text-xl" />
</div> */}
          {message &&
            (isLoading ? (
              <LoadingOutlined className="!flex hover:!text-blue-600 cursor-pointer !items-center !text-3xl !text-blue-700" />
            ) : (
              <SendOutlined
                className="!flex hover:!text-blue-600 cursor-pointer !items-center !text-3xl !text-blue-700"
                onClick={() =>
                  submitMessage(
                    fetchUserData,
                    fetchMessagesData,
                    messageApi,
                    message,
                    withUser,
                    isNew && !messages?.length,
                    socket,
                    setMessage,
                    user_id,
                    setIsLoading
                  )
                }
              />
            ))}
        </div>
        {emojiOpen && (
          <EmojiPicker
            searchDisabled
            previewConfig={{
              showPreview: false,
            }}
            width={"100%"}
            height={"190px"}
            onEmojiClick={(data) => setMessage((m) => (m || "") + data?.emoji)}
          />
        )}
      </div>
    </>
  );
};

export default Messages;
