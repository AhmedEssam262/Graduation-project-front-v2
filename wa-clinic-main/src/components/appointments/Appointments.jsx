import { Alert, Avatar, Empty, message, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useAppointmentContext } from "../../contexts/AppointmentContextProvider";
import Loader from "../Loader";
import userPhoto from "../../images/userPhoto.png";
import doctorPhoto from "../../images/doctorPhoto.png";
import { cancelAppointment } from "../doctorDashboard/dashboardServices";
import dayjs from "dayjs";
import AppointmentTime from "./appointmentUtils/AppointmentTime";
import { Link } from "react-router-dom";
import { StopOutlined } from "@ant-design/icons";
import { ImCancelCircle } from "react-icons/im";
import PopUp from "../utils/PopUp";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import DatePicker from "../user/doctors/doctorsUtils/DatePicker";
import Cookies from "universal-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaClinicMedical } from "react-icons/fa";
import { BiMessageAltDetail } from "react-icons/bi";
const chkEmpty = (appointmentState, appointmentData) =>
  appointmentState == "total"
    ? false
    : !appointmentData?.some(
        ({ appointment_state }) => appointmentState == appointment_state
      );
const getAppointmentVal = (
  appointment_state,
  valDone,
  valBooked,
  valCanceled,
  valDefault
) =>
  appointment_state == "done"
    ? valDone
    : appointment_state == "booked"
    ? valBooked
    : appointment_state == "canceled"
    ? valCanceled
    : valDefault;
const Appointments = ({
  user,
  isError,
  fetchUserData,
  fromDash,
  messageApi,
  socket,
}) => {
  const [selectedDate, setSelectedDate] = useState(() => ({
    count: 0,
    date: dayjs().format("YYYY-MM-DD"),
  }));
  const [appointmentState, setAppointmentState] = useState("total");
  const [cancelAppoint, setCancelAppoint] = useState();
  const { appointmentData, isLoading, setDashType, fetchAppointmentData } =
    useAppointmentContext();
  useEffect(() => {
    fetchAppointmentData(true, new Cookies().get("accessToken"), null, null, {
      date: selectedDate.date,
    });
  }, [selectedDate.date]);
  const nickname = user?.nick_name;
  const uimg = user?.img_url;
  if (isLoading) return <Loader />;
  const isEmpty = chkEmpty(appointmentState, appointmentData);
  return (
    <div>
      {/* {fromDash && (
        <div className="text-right my-4">
          <span
            onClick={() => setDashType("schedule")}
            className="cursor-pointer hover:bg-gray-800 font-medium text-white bg-gray-700 w-fit p-2 rounded-lg"
          >
            schedule Your Appointments
          </span>
        </div>
      )} */}
      <DatePicker
        fromAppointment
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div
        className={`mt-4 flex flex-wrap ${
          fromDash ? "lg" : "sm"
        }:flex-nowrap gap-1 justify-evenly cursor-pointer text-white text-center text-sm xl:text-lg`}
      >
        <div
          className={`flex  items-center hover:shadow-xl ${
            appointmentState == "total"
              ? "bg-yellow-500"
              : "hover:bg-gray-600 bg-gray-800"
          } p-2 ${fromDash ? "lg:ml-2" : "sm:ml-2"}`}
          style={{
            borderRadius: "20px 20px 0px 0px",
            border: "2px 2px 0px 2px solid white",
          }}
          onClick={() => setAppointmentState("total")}
        >
          Total Appointments
        </div>
        <div
          className={`flex items-center hover:shadow-xl ${
            appointmentState == "booked"
              ? "bg-yellow-500"
              : "hover:bg-gray-600 bg-gray-800"
          } p-2`}
          style={{
            borderRadius: "20px 20px 0px 0px",
            border: "2px 2px 0px 2px solid white",
          }}
          onClick={() => setAppointmentState("booked")}
        >
          Booked Appointments
        </div>
        <div
          className={`flex items-center hover:shadow-xl ${
            appointmentState == "done"
              ? "bg-yellow-500"
              : "hover:bg-gray-600 bg-gray-800"
          } p-2`}
          style={{
            borderRadius: "20px 20px 0px 0px",
            border: "2px 2px 0px 2px solid white",
          }}
          onClick={() => setAppointmentState("done")}
        >
          Done Appointments
        </div>
        {fromDash && (
          <div
            className={`flex items-center hover:shadow-xl ${
              appointmentState == "free"
                ? "bg-yellow-500"
                : "hover:bg-gray-600 bg-gray-800"
            } p-2`}
            style={{
              borderRadius: "20px 20px 0px 0px",
              border: "2px 2px 0px 2px solid white",
            }}
            onClick={() => setAppointmentState("free")}
          >
            Free Appointments
          </div>
        )}
        <div
          style={{
            borderRadius: "20px 20px 0px 0px",
            border: "2px 2px 0px 2px solid white",
          }}
          className={`ml-4 mr-4 w-full ${
            fromDash
              ? "lg:ml-auto lg:mr-2 lg:w-fit"
              : "sm:ml-auto sm:mr-2 sm:w-fit"
          } flex items-center justify-center bg-gray-600`}
        >
          <Avatar
            src={uimg || user?.user_type == "doctor" ? doctorPhoto : userPhoto}
            size="large"
          />
          <div className="text-white p-2 font-medium text-xl lg:text-2xl 2xl:text-4xl">
            {nickname}
          </div>
        </div>
      </div>
      {appointmentData ? (
        appointmentData?.length != 0 && !isEmpty ? (
          <div className="flex flex-wrap gap-2">
            {appointmentData?.map(
              (
                {
                  patientId,
                  doctorId,
                  appointment_state,
                  appointment_id,
                  appointment_type,
                  booked_time,
                  slot_time,
                  doctorName,
                  rate,
                  username,
                  dimgUrl,
                  uimgUrl,
                  schedule_date,
                  fees,
                  specialty,
                },
                i
              ) =>
                (appointment_state == appointmentState ||
                  appointmentState == "total") && (
                  <div
                    key={i}
                    className={`appointment--container grow p-1 rounded-lg shadow-sm`}
                    // style={{
                    //   backgroundColor: "#4a6079",
                    // }}
                  >
                    <div
                      className={`flex flex-wrap items-start gap-1 p-2 bg-gray-300 rounded-lg border-1 border-white shadow-md`}
                    >
                      <div
                        style={{
                          flexGrow: 1,
                        }}
                        className={`appointment--details sm:grow-0 p-2 flex justify-between items-start
                      border-2 border-white rounded-xl ${getAppointmentVal(
                        appointment_state,
                        "bg-green-700/50",
                        "bg-yellow-600/50",
                        "bg-red-700/50",
                        "bg-blue-700/50"
                      )}`}
                      >
                        <div className="grow">
                          <div className="flex flex-wrap justify-between mb-2">
                            <div className="text-white bg-gray-700/50 rounded-lg w-fit p-1 font-medium flex gap-2 mb-2">
                              {getAppointmentVal(
                                appointment_state,
                                <CheckCircleOutlined className="!flex items-center !text-yellow-200 !text-2xl" />,
                                <ClockCircleOutlined className="!flex items-center !text-yellow-200 !text-2xl" />,
                                <CloseCircleOutlined className="!flex items-center !text-yellow-200 !text-2xl" />,
                                <AiOutlineLoading3Quarters className="!flex items-center !text-yellow-200 !text-2xl" />
                              )}
                              <span className="text-yellow-300 font-semibold">
                                Status:
                              </span>
                              <span className="font-medium">
                                {appointment_state.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-white bg-gray-700/50 rounded-lg w-fit p-1 font-medium flex gap-2 mb-2">
                              {appointment_type == "inClinic" ? (
                                <FaClinicMedical className="!flex items-center !text-gray-200 !text-xl" />
                              ) : appointment_type == "chat" ? (
                                <BiMessageAltDetail className="!flex items-center !text-gray-200 !text-xl" />
                              ) : null}
                              <span className="font-medium">
                                {appointment_type?.toUpperCase()}
                              </span>
                            </div>
                            {appointment_state == "booked" && !fromDash ? (
                              <div
                                onClick={() =>
                                  setCancelAppoint({
                                    selectedDate: dayjs(schedule_date),
                                    bookedSlot: slot_time,
                                    doctorId,
                                    appointmentId: appointment_id,
                                  })
                                }
                                className="cursor-pointer hover:bg-red-400/80 bg-red-400/50 rounded shadow-lg p-2"
                              >
                                <div className="flex gap-1 h-full justify-center items-center">
                                  <span className="text-white font-medium">
                                    Cancel
                                  </span>
                                  <ImCancelCircle className="text-white !w-4 !h-4" />
                                </div>
                              </div>
                            ) : null}
                          </div>
                          <AppointmentTime
                            appointmentId={appointment_id}
                            date={selectedDate.date}
                            patientId={patientId}
                            schedule_date={schedule_date}
                            doctorId={doctorId}
                            slot_time={slot_time}
                            appointment_state={appointment_state}
                            appointmentData={appointmentData}
                            getAppointmentVal={getAppointmentVal}
                            fetchAppointmentData={fetchAppointmentData}
                            order={i}
                          />
                        </div>
                      </div>
                      <Link
                        style={{
                          flexGrow: 4,
                        }}
                        to={`/profile/${fromDash ? patientId : doctorId}`}
                        className="personal--details grow hover:shadow-md hover:bg-gray-300 p-2 
                      border-2 border-white rounded-xl bg-gray-200"
                      >
                        <div className="flex gap-3 flex-wrap justify-start items-center">
                          <div className="doctor--details">
                            <div className="personal--image">
                              <Avatar
                                src={
                                  fromDash
                                    ? uimgUrl || userPhoto
                                    : dimgUrl || doctorPhoto
                                }
                                size="large"
                              />
                              <span className="text-gray-700 font-medium  sm:text-lg xl:text-xl">
                                {fromDash
                                  ? username
                                    ? `patient. ${username}`
                                    : "free slot"
                                  : `Dr. ${doctorName}`}
                              </span>
                            </div>
                            {appointment_state == "done" && (
                              <Rate
                                className="personal--rate"
                                value={rate}
                                disabled
                              />
                            )}
                          </div>
                          {!fromDash && (
                            <div className="flex gap-3 justify-start items-center">
                              <div className="doctor--more--details shadow-lg bg-gray-300 rounded p-2">
                                <span className="text-gray-700 font-medium sm:text-sm xl:text-base">
                                  Fees:{" "}
                                  <span className="text-gray-400">
                                    {fees || <StopOutlined />}
                                  </span>
                                </span>
                              </div>
                              <div className="doctor--more--details shadow-lg bg-gray-300 rounded p-2">
                                <span className="text-gray-700 font-medium  sm:text-base xl:text-lg">
                                  specialty:{" "}
                                  <span className="text-gray-400 sm:text-sm xl:text-base">
                                    {specialty || <StopOutlined />}
                                  </span>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <Empty
            className="p-2 !m-0 !mx-2 bg-gray-500 rounded-lg border-1 
            flex flex-col justify-center
            h-80 border-white shadow-2xl"
            description={
              <span className="text-white font-medium">
                there's no {appointmentState == "total" ? "" : appointmentState}{" "}
                Appointments
              </span>
            }
          />
        )
      ) : isError ? (
        <Alert
          className="mt-10"
          description="there's some issues rigth now !!!"
        />
      ) : (
        <Empty
          className="p-2 !m-0 !mx-2 bg-gray-500 rounded-lg border-1 
        flex flex-col justify-center
        h-80 border-white shadow-2xl"
          description={
            <span className="text-white font-medium">
              cannot get your appointments, try again later!
            </span>
          }
        ></Empty>
      )}
      {
        <PopUp
          show={!!cancelAppoint}
          handleClose={() => setCancelAppoint(null)}
          closeColor={"!text-red-800/80 hover:!text-red-800"}
        >
          <div className="text-center text-sm sm:text-lg p-2 bg-blue-400 text-white font-medium rounded-lg">
            {`${cancelAppoint?.bookedSlot} already booked`}
            <br /> Are you sure that you want cancel it ?
          </div>
          <div className="flex justify-center gap-2 p-2 mt-4">
            <div
              onClick={() => {
                // setBookedSlot(null);
                // setTotalSlots((totalSlots) => {
                //   const tSlots = totalSlots.filter(
                //     (val) => val != bookedSlot
                //   );
                //   if (tSlots.length == totalSlots.length)
                //     tSlots.push(bookedSlot);
                //   isMatched = isMatch(slotsData?.totalSlots, tSlots);
                //   return tSlots;
                // });
                cancelAppointment(
                  cancelAppoint?.selectedDate,
                  cancelAppoint?.bookedSlot,
                  cancelAppoint?.appointmentId,
                  messageApi,
                  fetchAppointmentData,
                  cancelAppoint?.doctorId,
                  setCancelAppoint,
                  "patient",
                  fetchUserData,
                  selectedDate.date,
                  null,
                  socket
                );
              }}
              className="cursor-pointer text-center !bg-red-500 p-2 grow text-white font-medium rounded-lg shadow-sm"
            >
              Apply
            </div>
            <div
              onClick={() => setCancelAppoint(null)}
              className="cursor-pointer text-center !bg-blue-400 p-2 text-white font-medium rounded-lg shadow-sm"
            >
              Cancel
            </div>
          </div>
        </PopUp>
      }
    </div>
  );
};

export default Appointments;
