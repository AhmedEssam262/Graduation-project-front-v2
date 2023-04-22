import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const changeState = async (
  fetchUserData,
  fetchDoctorsData,
  messageApi,
  setIsLoading,
  type,
  doctorId,
  socket
) => {
  messageApi.open({
    key: 1,
    content: `${
      type == "verified" ? "Verifying" : "Rejecting"
    } doctor account ...`,
    type: "loading",
    duration: 8,
  });
  const host = window?.location?.hostname;
  setIsLoading(true);
  axios
    .post(
      `http://${host}:5000/change/doctor`,
      {
        data: {
          type,
          doctorId,
        },
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
        content: `doctor account ${
          type == "verified" ? "is verified" : "is rejected"
        }`,
        type: "success",
        duration: 4,
      });
      fetchDoctorsData(
        {
          total: true,
        },
        true
      );
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
      if (err?.response?.status == 401) {
        fetchUserData(true, cookies.get("accessToken"));
      } else
        messageApi.open({
          key: 1,
          content: "there's some issues cannot submit your operation now",
          type: "error",
          duration: 3,
        });
    });
};

export default changeState;
