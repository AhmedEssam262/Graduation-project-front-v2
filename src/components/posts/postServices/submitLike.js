import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const submitLike = async (
  user,
  fetchUserData,
  fetchCommentsData,
  messageApi,
  likeType,
  postId,
  commentId,
  isPost,
  lenViewedComments,
  getLike,
  setLikeData,
  socket
) => {
  const data = { postId, commentId: commentId || null, likeType, isPost };
  const host = window?.location?.hostname;
  axios
    .post(
      `http://127.0.0.1:8000/api/submit/like`,
      {
        data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.get("accessToken")}`,
        },
      }
    )
    .then((res) => {
      // getLike(setLikeData, postId, commentId);
      setLikeData(res?.data?.data);
      // if (!isPost)
      //   fetchCommentsData(
      //     {
      //       postId,
      //       limit: lenViewedComments,
      //     },
      //     true
      //   );
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status == 401) {
        fetchUserData(true, cookies.get("accessToken"));
      } else
        messageApi.open({
          key: 1,
          content: "there's some issues cannot submit your comment now",
          type: "error",
          duration: 2,
        });
    });
};

export default submitLike;
