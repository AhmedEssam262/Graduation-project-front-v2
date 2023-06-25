import { message } from "antd";
import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  useLayoutEffect,
  useReducer,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const AppointmentData = createContext(null);
const AppointmentContextProvider = ({
  children,
  token,
  fetchUserData,
  isDoctor,
  messageApi,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState(null);
  const host = window?.location?.hostname;
  const fetchAppointmentData = async (
    active,
    directToken,
    done,
    postData,
    query,
    noWaiting
  ) => {
    if (!noWaiting) setIsLoading(true);
    if (!token && !active) {
      setAppointmentData(null);
      return setIsLoading(false);
    }
    try {
      if (done) {
        const { data } = await axios.post(
          `http://127.0.0.1:8000/api/done/appointments${
            isDoctor || query?.doctor
              ? `?doctor=true${query.date && `&date=${query.date}`}`
              : `?date=${query?.date}`
          }`,
          { data: postData },
          {
            headers: {
              Authorization: `Bearer ${active ? directToken : token}`,
            },
            timeout: 10000,
          }
        );
        setAppointmentData(data?.data);
        setIsLoading(false);
        return data;
      } else {
        const { data } = await axios.request(
          `http://127.0.0.1:8000/api/get/appointments?${
            query?.date ? `&date=${query?.date}` : ""
          }${query?.doctorId ? `&doctor_id=${query?.doctorId}` : ""}${
            isDoctor || query?.doctor ? `&doctor=true` : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${active ? directToken : token}`,
            },
            timeout: 10000,
          }
        );
        setAppointmentData(data?.data);
        setIsLoading(false);
      }
    } catch (err) {
      const msg = err?.response?.data?.data?.name;
      switch (msg) {
        case "TokenExpiredError":
          fetchUserData(true, null, {
            response: {
              data: {
                data: {
                  name: "TokenExpiredError",
                },
              },
            },
          });
          break;
        case "JsonWebTokenError":
          setAppointmentData(null);
          fetchUserData(true, null, {
            response: {
              data: {
                data: {
                  name: "JsonWebTokenError",
                },
              },
            },
          });
          break;
        default:
          setAppointmentData(null);
          break;
      }
      setIsLoading(false);
      throw err;
    }
  };
  // useLayoutEffect(() => {
  //   fetchAppointmentData();
  // }, []);
  return (
    <AppointmentData.Provider
      value={{
        isLoading,
        appointmentData,
        fetchAppointmentData,
        setAppointmentData,
        messageApi,
      }}
    >
      {children}
    </AppointmentData.Provider>
  );
};

export default AppointmentContextProvider;

export const useAppointmentContext = () => useContext(AppointmentData);
