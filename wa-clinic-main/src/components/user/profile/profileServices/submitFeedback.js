import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const submitFeedback = async (
  rateValue,
  feedbackValue,
  feedback_to,
  messageApi,
  fetchProfileData,
  fetchUserData,
  doctorName
) => {
  const data = {
    rate: rateValue || 0,
    feedback: feedbackValue || null,
    feedback_to,
  };
  messageApi.open({
    key: 1,
    content: "submitting your feedback ...",
    type: "loading",
    duration: 8,
  });
  const host = window?.location?.hostname;
  axios
    .post(
      `http://127.0.0.1:8000/api/submit/feedback`,
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
      if (res?.data?.data?.isFirst)
        messageApi.open({
          key: 1,
          content: "thank you for your feedback ❤",
          type: "success",
          duration: 2,
        });
      else
        messageApi.open({
          key: 1,
          content: "thank you for your feedback ❤ , feedback updated",
          type: "success",
          duration: 2,
        });
      fetchProfileData({ path: "profile", username: doctorName }, true);
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status == 401) {
        fetchUserData(true, cookies.get("accessToken"));
      } else
        messageApi.open({
          key: 1,
          content: "there's some issues cannot submit your feedback now",
          type: "error",
          duration: 2,
        });
    });
};

export default submitFeedback;