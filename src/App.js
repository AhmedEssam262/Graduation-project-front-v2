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
import AdminDashboard from "./components/admin/AdminDashboard";
import { ContextProvider } from "./components/admin/contexts/ContextProvider";
import Transition from "./components/utils/transition/Transition";
const socket = io.connect(`http://${window.location.hostname}:3000`);
const cookies = new Cookies();
const timeZone = " gmt+0300";
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
                  <HomePage
                    user={userAuth}
                    isUserLoading={isLoading}
                    socket={socket}
                  />
                </HomeContextProvider>
              }
            />
            <Route path="/error" element={<ServerError />} />
            <Route
              path="/doctors"
              element={
                <DoctorsContextProvider noFirstRender>
                  <Doctors
                    socket={socket}
                    user={userAuth}
                    ref={DoctorRef}
                    timeZone={timeZone}
                  />
                </DoctorsContextProvider>
              }
            />
            <Route
              path="/chat"
              element={handleRoute(
                <ChatContextProvider fetchUserData={fetchUserData}>
                  <Chat
                    isChat={true}
                    timeZone={timeZone}
                    user={userAuth}
                    fetchUserData={fetchUserData}
                    messageApi={messageApi}
                    socket={socket}
                  />
                </ChatContextProvider>,
                userAuth,
                isLoading,
                isError
              )}
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
                    timeZone={timeZone}
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
                    timeZone={timeZone}
                    fetchUserData={fetchUserData}
                    user={userAuth}
                    socket={socket}
                  />
                </AppointmentContextProvider>,
                userAuth && userAuth?.user_type !== "admin",
                isLoading,
                isError
              )}
            />
            <Route
              path="/admin"
              element={handleRoute(
                <AdminDashboard
                  socket={socket}
                  user={userAuth}
                  timeZone={timeZone}
                />,
                userAuth?.user_type == "admin",
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
                    isUserLoading={isLoading}
                    user={userAuth}
                    timeZone={timeZone}
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
      {location.pathname == "/" && (
        <div className="app--footer">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
