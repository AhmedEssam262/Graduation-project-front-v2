import React from "react";
import { BsFillChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const getAppointmentVal = (
  appointment_state,
  valDone,
  valBooked,
  valCanceled,
  valFree,
  valRunning,
  valDefault
) =>
  appointment_state == "done"
    ? valDone
    : appointment_state == "booked"
    ? valBooked
    : appointment_state == "canceled"
    ? valCanceled
    : appointment_state == "free"
    ? valFree
    : appointment_state == "running"
    ? valRunning
    : valDefault;
const AppointmentStart = ({ appointmentDetails }) => {
  return (
    <div className="text-white grow">
      <div className="chat--details h-full">
        {appointmentDetails?.appointment_state == "running" &&
        appointmentDetails?.appointment_type == "chat" ? (
          <Link
            to="/chat"
            onClick={() =>
              window?.localStorage.setItem("chatTo", appointmentDetails?.withId)
            }
            className="font-medium h-full hover:!text-gray-200 text-xl !flex !justify-center !items-center gap-2 hover:!bg-blue-700 !block text-white bg-blue-700/90 p-2 rounded-md"
          >
            Chat with {appointmentDetails?.withNickName}
            <BsFillChatFill className="text-white text-xl" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default AppointmentStart;
