import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "./adminUtils";
import "./AdminDashboard.css";
import { useMediaQuery } from "react-responsive";
import DoctorManagment from "./adminUtils/DoctorManagment";
import {
  ChatContextProvider,
  DoctorsContextProvider,
  ProfileContextProvider,
} from "../../contexts";
import Chat from "../chat/Chat";
import { useUserContext } from "../../contexts/UserContextProvider";
import UserProfile from "../user/profile/UserProfile";
const AdminDashboard = ({ user, socket }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:878px)",
  });
  const { fetchUserData, isLoading, messageApi } = useUserContext();
  const [activeMenu, setActiveMenu] = useState(false);
  const [dashType, setDashType] = useState(
    window.localStorage.getItem("adminDashType")
  );
  useEffect(() => {
    if (dashType) window.localStorage.setItem("adminDashType", dashType);
  }, [dashType]);
  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="fixed w-full sm:w-64 sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar
              user={user}
              setDashType={setDashType}
              dashType={dashType}
              isMobile={isMobile}
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu}
            />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar
              user={user}
              setDashType={setDashType}
              dashType={dashType}
              isMobile={isMobile}
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu}
            />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-64 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="mb-16 md:mb-0">
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar
                user={user}
                dashType={dashType}
                isMobile={isMobile}
                setDashType={setDashType}
                setActiveMenu={setActiveMenu}
                activeMenu={activeMenu}
              />
            </div>
          </div>
          {dashType == "doctor" ? (
            <DoctorsContextProvider query={{ total: true }}>
              <DoctorManagment socket={socket} />
            </DoctorsContextProvider>
          ) : dashType == "chat" ? (
            <ChatContextProvider fetchUserData={fetchUserData}>
              <Chat
                isAdmin={true}
                user={user}
                fetchUserData={fetchUserData}
                messageApi={messageApi}
                socket={socket}
              />
            </ChatContextProvider>
          ) : dashType == "profile" ? (
            <ProfileContextProvider>
              <UserProfile
                isUserLoading={isLoading}
                socket={socket}
                fetchUserData={fetchUserData}
                userid={user?.user_id}
              />
            </ProfileContextProvider>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
