import { Button, Drawer, Empty, message, Popover, Tag } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useSlotsContext } from "../../../contexts/SlotsContextProvider";
import { scheduleAppointments, cancelAppointment } from "../dashboardServices";
import Loader from "../../Loader";
import { CalendarView } from "../../user/profile/profileUtils";
import PopUp from "../../utils/PopUp";
import AppointmentForm from "./scheduleUtils/AppointmentForm";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import AppointmentCard from "./scheduleUtils/AppointmentCard";
import { useNavigate } from "react-router-dom";
import {
  CloseCircleOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
const isMatch = (arr1, arr2) => {
  if (arr1?.length == 0 && arr2?.length == 0) return true;
  if (arr1?.length !== arr2?.length) return false;
  const arrClone1 = new Array(...arr1).sort();
  const arrClone2 = new Array(...arr2).sort();
  return arrClone1.every((val, i) => val == arrClone2[i]);
};
const ScheduleAppointments = ({
  doctorData,
  userid,
  isDoctorLoading,
  buttonLabel,
  fetchUserData,
  offsetWidth,
  setDashType,
  socket,
}) => {
  const [handleDrawer, setHandleDrawer] = useState(false);
  const { slotsData, isLoading, fetchSlotsData } = useSlotsContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [showPop, setShowPop] = useState(null);
  const [isAction, setIsAction] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => dayjs());
  const navigate = useNavigate();
  const isVerified =true;
//  const isVerified = doctorData?.is_verified;

  useEffect(() => {
    if (userid) socket.emit("join_appointments", userid);
  }, []);
  useEffect(() => {
    const getSlots = (data) => {
      if (selectedDate.format("YYYY-MM-DD") == data?.date)
        fetchSlotsData(
          {
            date: selectedDate.format("YYYY-MM-DD"),
            doctorId: userid,
          },
          true
        );
    };
    if (
      userid &&
      selectedDate.format("YYYY-MM-DD") &&
      !(!isDoctorLoading && !isVerified)
    ) {
      socket.on("update_slots", getSlots);
      fetchSlotsData({
        date: selectedDate.format("YYYY-MM-DD"),
        doctorId: userid,
      });
      console.log("rendner", selectedDate.format("YYYY-MM-DD"));
    }
    return () => {
      socket?.off("all_slots", getSlots);
    };
  }, [selectedDate, userid]);
  const handleDate = (val) => {
    setSelectedDate(val);
  };
  const isToday = (val) =>
    new Date(selectedDate.format("YYYY-MM-DD") + " " + val) >
    Date.now() + 1000 * 60 * 60;
  const isUpToDate =
    selectedDate?.$d?.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
  const tAppointments = slotsData?.totalSlots;
  return (
    <div
      className={`schedule--wrapper
     p-3 rounded`}
      // style={{
      //   filter: bookedAppointment ? "blur(5px)" : "",
      // }}
    >
      <div className="text-right my-1">
        <span
          onClick={() => setDashType("appointments")}
          className="cursor-pointer hover:bg-orange-800 font-medium text-white bg-orange-700 w-fit p-2 rounded-lg"
        >
          My Appointments
        </span>
      </div>
      <h1 className="text-center !my-6 text-gray-700 text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl mt-2">
        Schedule Your Appointments
      </h1>
      {contextHolder}
      <CalendarView
        offsetWidth={offsetWidth}
        colorView="black"
        selectedDate={selectedDate}
        handleDate={handleDate}
      />
      {/* =================================== for book appointment page ===================================== */}
      {isUpToDate && !isLoading && !isDoctorLoading && isVerified ? (
        <>
          <div className="flex gap-2 flex-wrap">
            {tAppointments?.map(
              (
                {
                  slotTime,
                  appointmentState,
                  appointmentType,
                  appointmentFees,
                  appointmentId,
                },
                i
              ) => (
                <AppointmentCard
                  key={i + 1}
                  fetchSlotsData={fetchSlotsData}
                  fetchUserData={fetchUserData}
                  selectedDate={selectedDate}
                  userid={userid}
                  messageApi={messageApi}
                  tAppointments={tAppointments}
                  slotTime={slotTime}
                  appointmentFees={appointmentFees}
                  appointmentState={appointmentState}
                  appointmentType={appointmentType}
                  appointmentId={appointmentId}
                  setIsEdit={setIsAction}
                  setHandleDrawer={setHandleDrawer}
                  order={i + 1}
                  scheduleAppointments={scheduleAppointments}
                  setBookedAppointment={setBookedAppointment}
                  setShowPop={setShowPop}
                  socket={socket}
                />
              )
            )}
            <div
              onClick={() => setHandleDrawer(true)}
              className="bg-gray-300/50 gap-2 hover:bg-gray-300/80 flex justify-center items-center h-24 text-center cursor-pointer text-gray-500
           text-lg sm:text-xl xl:text-2xl font-medium rounded-lg hover:shadow-sm p-3 hover:text-gray-700"
              style={{
                flexGrow: 2,
              }}
            >
              <AiOutlineAppstoreAdd className="w-7 h-7" />
              New Appointments
            </div>
          </div>
          <Drawer
            open={handleDrawer}
            onClose={() => {
              setHandleDrawer(false);
              setTimeout(() => {
                setIsAction(false);
              }, 500);
            }}
            closable
            bodyStyle={{
              padding: "0px",
            }}
            contentWrapperStyle={{
              width: "100%",
            }}
            title={
              isAction ? `Edit Appointment ${isAction}` : "New Appointment"
            }
          >
            <AppointmentForm
              socket={socket}
              doctorData={doctorData}
              key={isAction ? 1 : 2}
              isEdit={isAction}
              editAppointment={tAppointments?.[isAction - 1] || []}
              selectedDate={selectedDate}
              messageApi={messageApi}
              tAppointments={tAppointments || []}
              userid={userid}
              isLoading={isLoading}
              fetchUserData={fetchUserData}
              fetchSlotsData={fetchSlotsData}
            />
          </Drawer>
        </>
      ) : isLoading || isDoctorLoading ? (
        <Loader />
      ) : isVerified == null ? (
        <div className="flex p-2 bg-yellow-600/60 rounded-lg flex-wrap gap-2 items-center justify-center">
          <div className="text-2xl text-yellow-100 font-medium">
            Your Account being Verified
          </div>
          <Tag
            color="gold"
            className="!flex gap-2 !items-center !p-4 !text-4xl !font-medium"
          >
            pending <LoadingOutlined />
          </Tag>
        </div>
      ) : isVerified == 0 ? (
        <div className="flex p-2 bg-red-600/60 rounded-lg flex-wrap gap-2 items-center justify-center">
          <div className="text-2xl text-red-100 font-medium">
            Your Account has been Rejected
          </div>
          <Tag
            color="red"
            className="!flex gap-2 !items-center !p-4 !text-4xl !font-medium"
          >
            Rejected <CloseCircleOutlined />
          </Tag>
        </div>
      ) : (
        <Empty
          className="!mt-2"
          description={
            <span className="font-medium text-black">
              choose recently date (uptodate)
            </span>
          }
        />
      )}
      {
        <PopUp
          show={showPop}
          handleClose={() => setShowPop(null)}
          closeColor={"!text-red-800/80 hover:!text-red-800"}
        >
          <div className="text-center text-sm sm:text-lg p-2 bg-blue-400 text-white font-medium rounded-lg">
            {`${bookedAppointment?.slotTime} already booked`}
            <br /> Are you sure that you want cancel it ?
          </div>
          <div className="flex justify-center gap-2 p-2 mt-4">
            <div
              onClick={() => {
                cancelAppointment(
                  selectedDate,
                  bookedAppointment?.slotTime,
                  bookedAppointment?.appointmentId,
                  messageApi,
                  fetchSlotsData,
                  userid,
                  setBookedAppointment,
                  "doctor",
                  fetchUserData,
                  null,
                  setShowPop,
                  socket
                );
              }}
              className="cursor-pointer text-center !bg-red-500 p-2 grow text-white font-medium rounded-lg shadow-sm"
            >
              Apply
            </div>
            <div
              onClick={() => setShowPop(null)}
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

export default ScheduleAppointments;
