import React, { useEffect, useState } from "react";
import {
  ClockCircleFilled,
  DislikeOutlined,
  LikeOutlined,
  LinkOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  BsEmojiAngry,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { Alert, Avatar, Button, Image, Input } from "antd";
import { MdReply } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import { TfiTime } from "react-icons/tfi";
import { Link } from "react-router-dom";
import submitComment from "../postServices/submitComment";
import { useCommentsContext } from "../../../contexts/CommentsContextProvider";
import { useUserContext } from "../../../contexts/UserContextProvider";
const CommentActions = ({
  isComment,
  postId,
  fetchCommentsData,
  setComments,
  show,
  setReply,
  order,
  numComments,
  showMore,
  lenViewedComments,
  isLoading,
}) => (
  <div className="p-2">
    <div className="flex flex-wrap gap-1 justify-between items-center">
      {/* <LinkOutlined className="!flex items-center !text-blue-500 !text-xl" /> */}
      <div className="flex gap-2 items-center bg-white p-2 rounded-lg shadow-sm">
        <LikeOutlined className="!flex hover:shadow-lg cursor-pointer rounded-full hover:!text-blue-600 items-center !fill-black !text-blue-500 !text-xl" />
        <DislikeOutlined className="!flex hover:shadow-lg cursor-pointer rounded-full hover:!text-yellow-600 items-center !fill-black !text-yellow-500 !text-xl" />
        <BsEmojiAngry className="!flex hover:shadow-lg cursor-pointer rounded-full hover:!text-red-800 items-center !text-red-500 !text-xl" />
      </div>
      {show && showMore && (
        <div
          onClick={() =>
            fetchCommentsData({
              postId,
              limit: lenViewedComments + 5,
            })
          }
          className="cursor-pointer p-2 rounded-lg hover:bg-gray-600 
          bg-gray-500 flex flex-wrap justify-center items-center gap-1"
        >
          {isLoading ? (
            <LoadingOutlined />
          ) : (
            <BsFillArrowDownCircleFill
              className="!flex hover:shadow-lg cursor-pointer 
          rounded-full hover:!bg-gray-900 items-center 
          !text-gray-100 !text-xl"
            />
          )}
          <span className="hidden sm:inline-block">
            Show {isComment ? "More Comments" : "Comments"}
          </span>
        </div>
      )}
      {!isComment ? (
        <div
          onClick={() => setReply((val) => (val === order ? false : order))}
          className="cursor-pointer p-2 rounded-lg text-gray-700 hover:bg-gray-100 bg-white"
        >
          Comment
        </div>
      ) : (
        <MdReply
          onClick={() => setReply((val) => (val === order ? false : order))}
          className="!flex hover:shadow-lg cursor-pointer 
        rounded-full hover:!text-blue-700 items-center 
        !text-blue-600 !text-xl"
        />
      )}
    </div>
  </div>
);
const Reply = ({
  isComment,
  setReply,
  postId,
  commentId,
  fetchCommentsData,
  socket,
  lenViewedComments,
}) => {
  const { userData, messageApi, fetchUserData } = useUserContext();
  const userid = userData?.user_id;
  const [content, setContent] = useState();
  const [showWarn, setShowWarn] = useState(false);
  return (
    <div
      className={`${
        isComment ? "pl-10 bg-gray-700" : "pl-10 bg-white"
      } mr-1 sticky rounded-lg`}
    >
      <div
        className={`p-2 flex justify-between ${
          isComment ? "text-white" : "text-gray-700"
        } rounded`}
      >
        <div className="flex justify-left items-center gap-1">
          <Avatar />
          {userData?.nick_name || "user"}
        </div>
        <div className="flex justify-center items-center">
          <RiChatDeleteLine
            onClick={() => setReply(() => false)}
            className={`!flex hover:shadow-lg cursor-pointer 
          rounded-full hover:!text-red-700 items-center 
          ${isComment ? "!text-gray-100" : "!text-gray-700"} !text-3xl`}
          />
        </div>
      </div>
      <div className="p-3">
        <Input
          className="!rounded-xl !h-20 sm:!w-1/2"
          value={content}
          onChange={(e) => setContent(e?.target?.value)}
        />
        <div className="p-3">
          <Button
            className="!rounded-lg !justify-center !font-medium !flex !items-center !border !border-blue-600 !text-white !m-0
          !py-4 !bg-blue-500/60 hover:!bg-blue-400
        "
            onClick={() => {
              if (userid && content)
                submitComment(
                  userData,
                  fetchUserData,
                  fetchCommentsData,
                  messageApi,
                  content,
                  postId,
                  commentId,
                  setReply,
                  socket,
                  lenViewedComments
                );
              else setShowWarn(true);
            }}
          >
            send
          </Button>
        </div>
        {(!userid || !content) && showWarn && (
          <Alert
            className="!bg-red-400 !mt-2"
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
  );
};
const CommentTemplate = ({
  postId,
  commentId,
  makeComment,
  isComment,
  show,
  setComments,
  setMakeComment,
  commentid,
  userid,
  order,
  numComments,
  content,
  issuedTime,
  imgUrl,
  nickname,
  numAngry,
  numDisLike,
  numLike,
  fetchCommentsData,
  showMore,
  socket,
  lenViewedComments,
  isLoading,
}) => (
  <div
    className={`rounded-lg
    ${order === makeComment ? "relative" : ""} pl-5 sm:pl-10 bg-white py-5 ${
      !show && "border-b-2"
    }`}
  >
    <div
      className={`p-1 flex gap-1 flex-wrap justify-between ${
        isComment ? "mr-1 text-gray-700" : "text-white"
      } rounded`}
    >
      <Link
        to={`/profile/${userid}`}
        className={`flex hover:text-gray-100 justify-left  ${
          isComment ? "!text-gray-700" : "!text-white"
        }  items-center gap-2`}
      >
        <Avatar src={imgUrl} />
        {nickname || "Message 1"}
      </Link>
      <div className="flex justify-left items-center gap-2">
        <span
          className={`text-xs ${
            isComment ? "!text-gray-700" : "!text-gray-300"
          }`}
        >
          {new Date(issuedTime).toLocaleString()}
        </span>
        <ClockCircleFilled
          className={`!flex hover:shadow-lg cursor-pointer 
                   hover:!bg-gray-900 items-center 
                  ${isComment ? "!text-gray-700" : "!text-gray-300"} !text-sm`}
        />
      </div>
    </div>
    <div className={`p-3 text-gray-600`}>{content || "Message 1"}</div>

    {makeComment === order && (
      <Reply
        commentId={commentId}
        postId={postId}
        isComment={isComment}
        setReply={setMakeComment}
        fetchCommentsData={fetchCommentsData}
        userid={userid}
        commentid={commentid}
        socket={socket}
        lenViewedComments={lenViewedComments}
      />
    )}
    <CommentActions
      show={show}
      isComment={isComment}
      setReply={setMakeComment}
      setComments={setComments}
      fetchCommentsData={fetchCommentsData}
      postId={postId}
      order={order}
      showMore={showMore}
      numComments={numComments}
      lenViewedComments={lenViewedComments}
      isLoading={isLoading}
    />
  </div>
);
const PostTemplate = ({
  userid,
  postId,
  imgUrl,
  nickname,
  numAngry,
  numDisLike,
  numLike,
  numComments,
  showMore,
  content,
  setComments,
  comments,
  issuedTime,
  fetchCommentsData,
  makeComment,
  setMakeComment,
  order,
  show,
  isComment,
  postImg,
  socket,
  lenViewedComments,
  isLoading,
}) => (
  <div
    className={`rounded-lg ${
      order === makeComment ? "relative" : ""
    } bg-gray-700 ${
      comments?.length >= 1 && "border-b-2 border-gray-100"
    } top-0 left-0`}
  >
    <div
      className={`p-1 flex gap-1 flex-wrap justify-between text-white rounded`}
    >
      <Link
        to={`/profile/${userid}`}
        className={`flex hover:text-gray-100 justify-left !text-white
        items-center gap-2`}
      >
        <Avatar src={imgUrl} />
        {nickname || "Message 1"}
      </Link>
      <div className="flex justify-left items-center gap-2">
        {/* <TfiTime
          className={`!flex hover:shadow-lg cursor-pointer 
                  rounded-full hover:!bg-gray-900 items-center 
                  ${isComment ? "!text-gray-700" : "!text-gray-100"} !text-sm`}
        /> */}
        <span className="text-xs text-gray-300">
          {new Date(issuedTime).toLocaleString()}
        </span>
        <ClockCircleFilled
          className={`!flex hover:shadow-lg cursor-pointer 
                   hover:!bg-gray-900 items-center 
                  ${isComment ? "!text-gray-700" : "!text-gray-300"} !text-sm`}
        />
      </div>
      {!!comments?.length && (
        <div
          onClick={() => setComments(() => [])}
          className="cursor-pointer p-2 rounded-lg hover:bg-gray-600 
                  bg-gray-500 flex text-white justify-center items-center gap-1"
        >
          <BsFillArrowUpCircleFill
            className="!flex hover:shadow-lg cursor-pointer 
                  rounded-full hover:!bg-gray-900 items-center 
                  !text-gray-100 !text-xl"
          />
          <span className="hidden sm:inline-block">Hide Comments</span>
        </div>
      )}
    </div>
    <div className={`p-3 text-center text-base sm:text-lg text-gray-300`}>
      {content || "Message 1"}
    </div>
    {postImg && (
      <div className="text-center w-full">
        <Image
          className=""
          style={{
            height: "150px",
            borderRadius: "10%",
            userSelect: "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          src={postImg}
        />
      </div>
    )}
    {makeComment === order && (
      <Reply
        postId={postId}
        isComment={isComment}
        setReply={setMakeComment}
        fetchCommentsData={fetchCommentsData}
        userid={userid}
        socket={socket}
        lenViewedComments={lenViewedComments}
      />
    )}
    <CommentActions
      show={show}
      isComment={isComment}
      setReply={setMakeComment}
      setComments={setComments}
      fetchCommentsData={fetchCommentsData}
      postId={postId}
      order={order}
      showMore={showMore}
      numComments={numComments}
      lenViewedComments={lenViewedComments}
      isLoading={isLoading}
    />
  </div>
);
const Post = ({
  postId,
  imgUrl,
  nickname,
  numAngry,
  numLike,
  numDisLike,
  content,
  issuedTime,
  numComments,
  userid,
  order,
  postImg,
  socket,
}) => {
  const { isLoading, fetchCommentsData, commentsData } = useCommentsContext();
  const [comments, setComments] = useState(commentsData || []);
  const [makeComment, setMakeComment] = useState(false);
  useEffect(() => {
    if (postId)
      socket.on(`recieve_comment_${postId}`, (data) => {
        numComments = (numComments || 0) + 1;
        setComments((c) =>
          c?.some(({ comment_id }) => comment_id == data?.comment_id)
            ? c
            : [data, ...c]
        );
      });
  }, []);
  useEffect(() => {
    setComments(commentsData || []);
  }, [commentsData]);
  return (
    <div className="p-2 grow w-full rounded-lg w-full bg-gray-700">
      <div
        className="flex relative flex-col"
        // style={{
        //   maxHeight: "550px",
        // }}
        // className="overflow-auto scroll--v scroll--v--comment"
      >
        {/*============================ Comment ===================================*/}
        <PostTemplate
          postImg={postImg}
          userid={userid}
          postId={postId}
          imgUrl={imgUrl}
          nickname={nickname}
          numAngry={numAngry}
          numDisLike={numDisLike}
          numLike={numLike}
          numComments={numComments}
          showMore={numComments || commentsData?.length ? true : false}
          content={content}
          setComments={setComments}
          issuedTime={issuedTime}
          socket={socket}
          order={"c"}
          fetchCommentsData={fetchCommentsData}
          makeComment={makeComment}
          setMakeComment={setMakeComment}
          show={!comments?.length ? true : false}
          comments={comments}
          lenViewedComments={comments?.length}
          isLoading={isLoading}
        />
        {/*============================ Comments ===================================*/}
        <div
          style={{
            maxHeight: "500px",
            // zIndex: `${order + 5}`,
          }}
          className={`flex flex-col rounded-lg p-1
          sm:bg-gray-700  transition-all duration-500 ${
            comments?.length ? "" : "!max-h-0 p-2"
          } overflow-auto gap-2 top-full w-full scroll--v scroll--v--comment`}
        >
          {comments?.map(
            (
              {
                comment_id: commentId,
                user_id: userid,
                img_url: imgUrl,
                nick_name: nickname,
                content,
                issued_time: issuedTime,
                is_reply: isReply,
                num_replies: numReplies,
                angry: numAngry,
                dislike: numDislike,
                like_emoji: numLike,
              },
              i
            ) => (
              <CommentTemplate
                key={i + 1}
                socket={socket}
                userid={userid}
                postId={postId}
                imgUrl={imgUrl}
                nickname={nickname}
                numAngry={numAngry}
                numLike={numLike}
                numDisLike={numDisLike}
                showMore={numComments > comments?.length ? true : false}
                content={content}
                issuedTime={issuedTime}
                order={i + 1}
                fetchCommentsData={fetchCommentsData}
                commentId={commentId}
                isComment
                setComments={setComments}
                setMakeComment={setMakeComment}
                makeComment={makeComment}
                show={i == comments.length - 1 ? true : false}
                lenViewedComments={comments?.length}
                isLoading={isLoading}
              />
            )
          )}
        </div>

        {/*===================================================================== */}
      </div>
    </div>
  );
};

export default Post;
