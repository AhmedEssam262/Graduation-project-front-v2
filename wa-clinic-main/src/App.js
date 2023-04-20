import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  HomePage,
  Doctors,
  Feedbacks,
  UserProfile,
  Login,
  Signup,
  DoctorDashboard,
  Loader,
  Chat,
} from "./components";
import Footer from "./components/footer/Footer";
import Cookies from "universal-cookie";
import {
  DoctorsContextProvider,
  HomeContextProvider,
  ProfileContextProvider,
  DashboardContextProvider,
  FeedbackContextProvider,
  PostsContextProvider,
  ChatContextProvider,
} from "./contexts";
import { useUserContext } from "./contexts/UserContextProvider";
import Appointments from "./components/appointments/Appointments";
import AppointmentContextProvider from "./contexts/AppointmentContextProvider";
import Posts from "./components/posts/Posts";
import io from "socket.io-client";
import AppointmentPayment from "./components/bookAppointment/appointmentUtils/AppointmentPayment";
import ServerError from "./components/utils/ServerError";
const socket = io.connect(`http://${window.location.hostname}:3000`);
const cookies = new Cookies();
const handleRoute = (element, permission, isLoading, isError) =>
  permission ? (
    element
  ) : isLoading ? (
    <Loader />
  ) : isError ? (
    <Navigate to="/error" replace />
  ) : (
    <Navigate to="/forbbiden" replace />
  );
const App = () => {
  const [navActive, setNavActive] = useState(true);
  const DoctorRef = useRef();
  const location = useLocation();
  const {
    userData,
    isLoading,
    isError,
    tokenExpired,
    fetchUserData,
    setUserData,
    messageApi,
  } = useUserContext();
  // if (userData) window.localStorage.setItem("user", JSON.stringify(userData));
  const userAuth = userData;
  return (
    <div className="app flex flex-col min-h-screen">
      <div className="app--wrapper grow">
        {navActive && (
          <Navbar
            messageApi={messageApi}
            isUserLoading={isLoading}
            DoctorRef={DoctorRef}
            user={userAuth}
            setUserData={setUserData}
          />
        )}
        <div
          className="app--main flex flex-col grow"
          style={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <HomeContextProvider>
                  <HomePage user={userAuth} socket={socket} />
                </HomeContextProvider>
              }
            />
            <Route path="/error" element={<ServerError />} />
            <Route
              path="/doctors"
              element={
                <DoctorsContextProvider noFirstRender>
                  <Doctors user={userAuth} ref={DoctorRef} />
                </DoctorsContextProvider>
              }
            />
            <Route
              path="/chat"
              element={
                <ChatContextProvider fetchUserData={fetchUserData}>
                  <Chat
                    isChat={true}
                    user={userAuth}
                    fetchUserData={fetchUserData}
                    messageApi={messageApi}
                    socket={socket}
                  />
                </ChatContextProvider>
              }
            />
            <Route
              path="/profile/:username"
              element={
                <ProfileContextProvider>
                  <UserProfile
                    socket={socket}
                    isUserLoading={isLoading}
                    fetchUserData={fetchUserData}
                    userid={userAuth?.user_id}
                  />
                </ProfileContextProvider>
              }
            />
            <Route
              path="/feedbacks"
              element={
                <FeedbackContextProvider>
                  <Feedbacks />
                </FeedbackContextProvider>
              }
            />
            <Route
              path="/posts"
              element={
                <PostsContextProvider>
                  <Posts socket={socket} />
                </PostsContextProvider>
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  user={userAuth}
                  isTokenExpired={tokenExpired}
                  fetchUserData={fetchUserData}
                />
              }
            />
            <Route path="/signup" element={<Signup user={userAuth} />} />
            <Route
              path="/appointment/payment"
              element={<AppointmentPayment />}
            />
            <Route
              path="/appointments"
              element={handleRoute(
                <AppointmentContextProvider
                  fetchUserData={fetchUserData}
                  token={cookies.get("accessToken")}
                >
                  <Appointments
                    messageApi={messageApi}
                    fetchUserData={fetchUserData}
                    user={userAuth}
                    socket={socket}
                    isError={isError}
                  />
                </AppointmentContextProvider>,
                userAuth,
                isLoading,
                isError
              )}
            />
            <Route
              path="/dashboard"
              element={handleRoute(
                <DashboardContextProvider
                  fetchUserData={fetchUserData}
                  token={cookies.get("accessToken")}
                >
                  <DoctorDashboard
                    setNavActive={setNavActive}
                    messageApi={messageApi}
                    isError={isError}
                    isUserLoading={isLoading}
                    user={userAuth}
                    fetchUserData={fetchUserData}
                    socket={socket}
                  />
                </DashboardContextProvider>,
                userAuth?.user_type == "doctor",
                isLoading,
                isError
              )}
            />
          </Routes>
        </div>
      </div>
      {!(
        location.pathname?.includes("/dashboard") ||
        location.pathname?.includes("/chat")
      ) && (
        <div className="app--footer">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
