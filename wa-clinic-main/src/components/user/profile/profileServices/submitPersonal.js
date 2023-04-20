import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const submitPersonal = async (
  values,
  messageApi,
  fetchProfileData,
  fetchUserData,
  userName,
  isEdit
) => {
  const data = {
    values: {
      ...values,
      birth: `${values?.birth?.$y}-${values?.birth?.$M + 1}-${
        values?.birth?.$D
      }`,
    },
    isEdit,
  };
  messageApi.open({
    key: 1,
    content: "submitting your informations ...",
    type: "loading",
    duration: 8,
  });
  const host = window?.location?.hostname;
  axios
    .post(
      `http://127.0.0.1:8000/api/submit/personal`,
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
      messageApi.open({
        key: 1,
        content: "your information updated",
        type: "success",
        duration: 2,
      });
      setTimeout(
        () => fetchProfileData({ path: "profile", username: userName }, true),
        2000
      );
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

export default submitPersonal;
