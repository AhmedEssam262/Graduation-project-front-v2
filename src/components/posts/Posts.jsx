import { Alert, Button, Empty, Input, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import submitPost from "./postServices/submitPost";
import { usePostsContext } from "../../contexts/PostsContextProvider";
import Post from "./postUtils/Post";
import { useUserContext } from "../../contexts/UserContextProvider";
import { CommentsContextProvider } from "../../contexts";
import { PlusOutlined } from "@ant-design/icons";
import { BiImageAdd } from "react-icons/bi";
import { TitleHeader } from "../home/HomePage";
import { BsQuestion } from "react-icons/bs";
import { RiQuestionAnswerFill } from "react-icons/ri";
import ServerError from "../utils/ServerError";
import { useMediaQuery } from "react-responsive";
import Loader from "../Loader";
const getBase64 = (img, setPostImg) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => setPostImg(reader?.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const Posts = ({ socket, home }) => {
  const {
    fetchUserData,
    userData,
    isLoading: isUserLoading,
    messageApi,
    userData: userAuth,
  } = useUserContext();
  const isMobile = useMediaQuery({
    query: "(max-width:778px)",
  });
  const { postsData, isLoading, isError, fetchPostsData } = usePostsContext();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [showWarn, setShowWarn] = useState(false);
  useEffect(() => {
    setPosts(postsData || []);
  }, [postsData]);
  useEffect(() => {
    const addPost = (data) =>
      setPosts((p) =>
        p?.some(({ post_id }) => post_id == data?.post_id) ? p : [data, ...p]
      );
    socket.on(`recieve_post`, addPost);
    return () => {
      socket.off("recieve_post", addPost);
    };
  }, []);
  const userid = userAuth?.user_id;
  return (
    <div className="mt-1 rounded-tr-lg rounded-tl-lg text-white font-medium">
      {/* <div className="mt-2 bg-blue-900/80 border-y py-2 border-white mb-2 text-xl text-white text-center">
        Chating Our Doctors
      </div> */}
      <div className="p-4">
        {/* <div className="mt-2 inline-block p-2 bg-gray-500/80 rounded-md shadow-lg">
          <span className="p-2 bg-gray-300/50 rounded-md text-center inline-block">
            Posts
          </span>
        </div> */}
        <div className="flex p-1 justify-center">
          <div className="border border-gray-150 shadow-md w-full p-4 bg-gray-300/30 rounded-lg sm:w-3/4 xl:w-1/2">
            <Input.TextArea
              placeholder="Ask for any question, state your condition or medical issue"
              className="!rounded-lg !border scroll--v !border-gray-400"
              value={content}
              rows={6}
              style={{ resize: "none" }}
              onChange={(e) => setContent(e?.target?.value)}
            />
            <div className="flex relative justify-between gap-2 items-center p-2">
              <Upload
                name="avatar"
                customRequest={() => true}
                beforeUpload={beforeUpload}
                showUploadList={false}
                onChange={(inf) => {
                  if (inf?.file?.status)
                    getBase64(inf?.file?.originFileObj, setPostImg);
                }}
              >
                {postImg ? (
                  <div className="relative">
                    <img
                      className="rounded-lg"
                      src={postImg}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                    <div
                      onClick={(e) => {
                        setPostImg(null);
                        e.stopPropagation();
                      }}
                      style={{ top: 0, left: "calc(100% - 20px)" }}
                      className="text-2xl text-red-400/50 hover:text-red-400 absolute"
                    >
                      X
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <BiImageAdd className="!text-gray-700 text-3xl" />
                  </div>
                )}
              </Upload>
              <Button
                onClick={() => {
                  if (userid && content)
                    submitPost(
                      userData,
                      fetchUserData,
                      fetchPostsData,
                      messageApi,
                      content,
                      postImg,
                      setContent,
                      socket
                    );
                  else setShowWarn(true);
                }}
                className="!rounded-lg !justify-center !font-medium !flex w-1/2 !items-center !border !border-blue-600 !text-white !m-0
            !py-4 !bg-blue-700/80 hover:!bg-blue-700
            "
              >
                Post
              </Button>
              {(!userid || !content) && showWarn && (
                <Alert
                  className="!bg-red-500 !rounded-md !top-full !absolute !w-full"
                  closeText={<span className="text-white text-base">X</span>}
                  closable
                  onClose={() => setShowWarn(false)}
                  description={
                    <span className="text-white font-medium">
                      {!userid
                        ? "Please Sign up or login to use these features"
                        : "type any comment to submit"}
                    </span>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="flex justify-center p-2 border-y
      border-white mb-2 bg-blue-900/80 items-center"
      >
        <span className="text-xl">Latest Questions</span>
      </div> */}
      <TitleHeader
        to={home ? "posts" : ""}
        wrapperBg={"no"}
        icon={
          <RiQuestionAnswerFill className="!w-16 !h-16 !m-auto text-white" />
        }
        title={home ? "Latest Questions" : "All Questions"}
      />
      <div className="pr-2">
        <div
          style={{
            maxHeight: home ? "548px" : "",
            marginInline: !isMobile ? "50px" : "",
          }}
          className={`flex flex-wrap gap-2 ${
            home ? "overflow-auto scroll--v scroll--v--chat scroll--h" : ""
          } items-start py-2 px-1`}
        >
          {posts?.length > 0 ? (
            posts?.map(
              (
                {
                  user_id: userid,
                  user_type: userType,
                  post_img: postImg,
                  img_url: imgUrl,
                  nick_name: nickname,
                  content,
                  issued_time: issuedTime,
                  num_comments: numComments,
                  angry: numAngry,
                  dislike: numDislike,
                  like_emoji: numLike,
                  post_id: postId,
                },
                i
              ) => (
                <CommentsContextProvider key={postId}>
                  <Post
                    socket={socket}
                    order={postsData?.length - i}
                    userid={userid}
                    nickname={nickname}
                    postImg={postImg}
                    numAngry={numAngry}
                    numLike={numLike}
                    numDisLike={numDislike}
                    numComments={numComments}
                    userType={userType}
                    content={content}
                    issuedTime={issuedTime}
                    postId={postId}
                    imgUrl={imgUrl}
                  />
                </CommentsContextProvider>
              )
            )
          ) : isError ? (
            <ServerError errorTitle={"Posts"} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <Empty
              className="!mt-20 !text-gray-700 !w-full !mb-4 !font-medium"
              description="There's no Posts"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
