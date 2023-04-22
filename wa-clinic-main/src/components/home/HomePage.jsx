import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Rate, Avatar } from "antd";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Cryptocurrencies from "../user/doctors/Doctors";
import Feedbacks from "./../feedback/Feedbacks";
import Loader from "../Loader";
import Doctors from "../user/doctors/Doctors";
import {
  PostsContextProvider,
  DoctorsContextProvider,
  FeedbackContextProvider,
  SlotsContextProvider,
} from "../../contexts";
import Countup from "react-countup";
import { useHomeContext } from "../../contexts/HomeContextProvider";
import Posts from "../posts/Posts";
import heroClinic from "../../images/back2.jpg";
import Arrow from "./Arrow";
import { AiOutlineSchedule } from "react-icons/ai";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { GiDoctorFace } from "react-icons/gi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
const { Title } = Typography;
const HomePage = ({ socket, user }) => {
  const { homeData, isLoading } = useHomeContext();
  const isMobile = useMediaQuery({
    query: "(max-width:778px)",
  });
  const globalStats = homeData;
  const HomeData = [
    {
      borderLine: "2",
      isLine: true,
      noLine: "no",
      title: "Total Doctors",
      value: globalStats?.totalDoctors,
    },
    {
      borderLine: "1",
      isLine: true,
      noLine: "sm",
      title: "Average Rating",
      value: globalStats?.avgRate,
      prefix: (
        <Rate
          disabled
          allowHalf
          className="!block !mr-2"
          value={globalStats?.avgRate || 0}
        />
      ),
      suffix: <span className="text-gray-600 font-normal">/5</span>,
    },
    {
      borderLine: "1",
      isLine: true,
      noLine: "no",
      title: "Average Fees",
      value: globalStats?.avgFees,
    },
    {
      borderLine: "1",
      isLine: true,
      noLine: "sm",
      title: "Total Appointments",
      value: globalStats?.totalAppointments,
    },
    {
      borderLine: "1",
      isLine: true,
      noLine: "no",
      title: "Total Feedback",
      value: globalStats?.totalReviews,
    },
  ];
  return (
    <>
      <div
        className="text-center px-2"
        style={{
          backgroundImage: `url(${heroClinic})`,
          width: "100%",
          backgroundSize: "cover",
          minHeight: isMobile ? `calc(100vh - 105.6px)` : `100vh`,
        }}
      >
        <h1
          className="mt-10 text-gray-100 shadow-lg  p-2 sm:p-4 sm:py-6
           rounded-lg text-xl sm:text-4xl ml-auto mr-auto"
          style={{
            fontFamily: "cursive",
            backgroundImage:
              "linear-gradient(to right, #194d84, #34659b, #407dbf)",
          }}
        >
          Online Clinic
        </h1>
        {user && (
          <div className="flex gap-8 mt-2 justify-center px-2">
            <div className="w-5/6">
              <Arrow />
              <div className="mt-2">
                <Link
                  className="p-2 py-4 !bg-blue-900 hover:!text-white text-center hover:!bg-blue-500 !text-xs sm:!text-base !block rounded-lg !bg-blue-400 font-medium text-gray-100"
                  to={
                    user?.user_type == "user"
                      ? `/profile/${user?.user_name}`
                      : user?.user_type == "admin"
                      ? `/admin`
                      : `/dashboard`
                  }
                >
                  {user?.img_url ? (
                    <Avatar src={user.img_url} size="large" />
                  ) : user?.user_type == "user" ? (
                    <ImProfile className="mb-2 flex justify-center items-center w-full !text-lg sm:!text-2xl" />
                  ) : (
                    <MdDashboard className="mb-2 flex justify-center items-center w-full !text-lg sm:!text-2xl" />
                  )}
                  {user?.user_type == "user"
                    ? `My Profile`
                    : user?.user_type == "admin"
                    ? `My Admin Dashboard`
                    : `My Doctor Dashboard`}
                </Link>
              </div>
            </div>
          </div>
        )}
        {user && (
          <div className="flex gap-8 mt-2 justify-center px-2">
            <div
              className={`${user?.user_type == "admin" ? "w-4/5" : "w-1/2"}`}
            >
              <Arrow />
              <div className="mt-2">
                <Link
                  className="p-2 py-4 !bg-blue-800 hover:!text-white text-center hover:!bg-blue-500 !text-xs sm:!text-base !block rounded-lg !bg-blue-400 font-medium text-gray-100"
                  to="/chat"
                >
                  <BsFillChatSquareTextFill className="mb-2 flex justify-center items-center w-full !text-lg sm:!text-2xl" />
                  Chatting
                </Link>
              </div>
            </div>
            {user.user_type !== "admin" && (
              <div className="w-1/2">
                <Arrow />
                <div className="mt-2">
                  <Link
                    className="p-2 py-4 !bg-blue-700 hover:!text-white text-center hover:!bg-blue-600 !text-xs sm:!text-base !block rounded-lg !bg-blue-400 font-medium text-gray-100"
                    to="/appointments"
                  >
                    <AiOutlineSchedule className="mb-2 flex justify-center items-center w-full !text-lg sm:!text-2xl" />
                    Your Appointments
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex gap-8 mt-2 justify-center px-2">
          <div className="w-1/2">
            <Arrow />
            <div className="mt-2">
              <Link
                className="p-2 py-4 !bg-blue-600 hover:!text-white text-center hover:!bg-blue-700 !text-xs sm:!text-base !block rounded-lg !bg-blue-400 font-medium text-gray-100"
                to="/doctors"
              >
                <GiDoctorFace className="mb-2 flex justify-center items-center w-full !text-lg sm:!text-2xl" />
                Doctors
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <Arrow />
            <div className="mt-2">
              <Link
                className="p-2 hover:!text-white text-center !bg-blue-500 py-4 hover:!bg-blue-800 !text-xs sm:!text-base !block rounded-lg !bg-blue-400 font-medium text-gray-100"
                to="/posts"
              >
                <RiQuestionAnswerLine className="mb-2 flex justify-center items-center w-full !text-lg sm:!text-2xl" />
                Questions
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*     
        <div className="relative rounded-br-lg rounded-bl-lg p-2">
          <img
            className="z-10 rounded-lg"
            src={heroClinic}
            style={{
              marginBlock: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              height: isMobile ? "" : "500px",
            }}
          />
        </div> */}
      <PostsContextProvider>
        <Posts socket={socket} home={true} isMobile={isMobile} />
      </PostsContextProvider>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Title className="!text-lg sm:!text-3xl home--header">
            Online Clinic Statistics
          </Title>
          <Row
            className="text-center shadow-md"
            style={{ marginBottom: "15px", marginLeft: "10px" }}
          >
            {HomeData?.map(
              (
                { title, value, prefix, suffix, isLine, noLine, borderLine },
                i
              ) => {
                const homeDetails = (
                  <>
                    <hr
                      className={`${
                        isLine
                          ? `w-full ${
                              noLine == "no" ? "" : `no--line ${noLine}:w-0`
                            }`
                          : ""
                      } ${
                        borderLine == "2"
                          ? "border-gray-600"
                          : "border-1 border-gray-300"
                      } mb-2`}
                      style={{
                        borderWidth: borderLine == "2" ? "1.5px" : "",
                      }}
                    />
                    <Col
                      className={`w-full sm:w-1/2 home--col--${
                        i + 1
                      } hover:shadow-md hover:bg-blue-100`}
                    >
                      {" "}
                      <Statistic
                        title={
                          <span className="text-gray-500 font-medium text-sm sm:text-lg">
                            {title}
                          </span>
                        }
                        className="statistics--name"
                        precision={2}
                        valueStyle={{
                          fontSize: isMobile ? "15px" : "20px",
                          fontWeight: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        value={value}
                        formatter={
                          title == "Average Rating"
                            ? null
                            : (val) => <Countup end={val} />
                        }
                        suffix={suffix}
                        prefix={prefix}
                      />{" "}
                    </Col>
                  </>
                );
                const HomeDetails = React.cloneElement(homeDetails, {
                  key: title,
                });
                return HomeDetails;
              }
            )}
          </Row>
        </>
      )}
      <div className="showmore--container">
        <div className="doctor--search py-3 rounded-tr-lg rounded-tl-lg bg-gray-700/80">
          <h1
            className="text-xl text-white flex justify-center p-2 border-y
      border-white mb-2 bg-blue-700/40 items-center"
          >
            Search for Your Doctor
          </h1>
          <p className="!text-sm sm:!text-xl text-center mt-8">
            <Link
              to="/doctors"
              className="bg-white text-gray-800 hover:text-gray-600 font-medium p-2 rounded-lg hover:shadow-lg"
            >
              Find Your Doctor Now
            </Link>
          </p>
        </div>
        {/* <div className="showmore--doctors">
          <Title
            className="!text-xl sm:!text-2xl lg:!text-3xl text-gray-700"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Our Doctors
          </Title>
          <Title
            className="!text-sm sm:!text-xl"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <Link to="/doctors">Show More</Link>
          </Title>
        </div> */}
        <DoctorsContextProvider query={{ limit: 5 }}>
          <Doctors home user={user} />
        </DoctorsContextProvider>
        <div className="showmore--reviews">
          <Title
            className="!text-xl sm:!text-2xl lg:!text-3xl"
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            Top 5 Feedbacks
          </Title>{" "}
          <Title
            className="!text-sm sm:!text-xl"
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            <Link to="/feedbacks">Show More</Link>
          </Title>{" "}
        </div>
        <FeedbackContextProvider
          contextQuery={{
            limit: 5,
          }}
        >
          <Feedbacks />
        </FeedbackContextProvider>
      </div>
    </>
  );
};

export default HomePage;
