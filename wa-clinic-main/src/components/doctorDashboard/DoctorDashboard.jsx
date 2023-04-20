import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScheduleAppointments from "./dashboardUtils/ScheduleAppointments";
import {
  ChatContextProvider,
  ProfileContextProvider,
  SlotsContextProvider,
} from "../../contexts";
import { useDashboardContext } from "../../contexts/DashboardContextProvider";
import Cookies from "universal-cookie";
import { useMediaQuery } from "react-responsive";
import DashNav from "./dashboardUtils/DashNav.jsx";
import UserProfile from "../user/profile/UserProfile";
import HeaderLine from "../sign/signup/signupUtils/HeaderLine";
import Appointments from "../appointments/Appointments";
import AppointmentContextProvider from "../../contexts/AppointmentContextProvider";
import Chat from "../chat/Chat";
const DoctorDashboard = ({
  user,
  fetchUserData,
  isError,
  isUserLoading,
  messageApi,
  socket,
  setNavActive,
}) => {
  const userid = user?.user_id;
  const username = user?.user_name;
  const { dashboardData, isLoading, fetchDashboardData } =
    useDashboardContext();
  useEffect(() => {
    const token = new Cookies().get("accessToken");
    fetchDashboardData(true, token);
  }, []);
  const isMobile = useMediaQuery({
    query: "(max-width:678px)",
  });
  const [dashType, setDashType] = useState(
    window.localStorage.getItem("dashType") || "profile"
  );
  useEffect(() => {
    window.localStorage.setItem("dashType", dashType);
    if (dashType == "chat") setNavActive(false);
    else setNavActive(true);
  }, [dashType]);
  useEffect(() => {
    return () => setNavActive(true);
  }, []);
  return (
    <div className={`${isMobile ? "flex" : ""} grow overflow-hidden  w-full`}>
      <DashNav setDashType={setDashType} dashType={dashType} />
      <div className="grow overflow-hidden">
        {dashType == "profile" ? (
          <div className="flex flex-col h-full grow overflow-hidden">
            <ProfileContextProvider>
              <UserProfile
                userid={userid}
                fetchUserData={fetchUserData}
                isUserLoading={isUserLoading}
              />
            </ProfileContextProvider>
          </div>
        ) : dashType == "schedule" ? (
          <div className="bg-white h-full">
            <SlotsContextProvider>
              <ScheduleAppointments
                socket={socket}
                doctorData={dashboardData}
                setDashType={setDashType}
                offsetWidth={100}
                buttonLabel="Schedule"
                userid={userid}
                fetchUserData={fetchUserData}
              />
            </SlotsContextProvider>
          </div>
        ) : dashType == "appointments" ? (
          <AppointmentContextProvider
            isDoctor={true}
            token={new Cookies().get("accessToken")}
            fetchUserData={fetchUserData}
          >
            <Appointments
              setDashType={setDashType}
              messageApi={messageApi}
              user={user}
              isError={isError}
              fetchUserData={fetchUserData}
              fromDash={true}
            />
          </AppointmentContextProvider>
        ) : dashType == "chat" ? (
          <ChatContextProvider fetchUserData={fetchUserData}>
            <Chat
              socket={socket}
              user={user}
              fetchUserData={fetchUserData}
              messageApi={messageApi}
            />
          </ChatContextProvider>
        ) : dashType == "statistics" ? (
          <div>statistics</div>
        ) : null}
      </div>
    </div>
  );
};

export default DoctorDashboard;
