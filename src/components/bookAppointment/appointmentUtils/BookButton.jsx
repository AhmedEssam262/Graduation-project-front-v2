import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";
import React from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaClinicMedical } from "react-icons/fa";
const BookButton = ({
  appointmentType,
  appointmentFees,
  appointmentState,
  slotTime,
  setBookedSlot,
  isActive,
}) => {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-2">
        <div className={`flex gap-2 bg-gray-400/40 p-2 rounded-lg`}>
          <Loading3QuartersOutlined className="!flex items-center !text-yellow-200 !text-2xl" />
          ,
          <span className="text-white font-medium">
            {appointmentState?.toUpperCase()}
          </span>
        </div>
        <div className={`flex gap-2 bg-gray-600/40 p-2 rounded-lg`}>
          {appointmentType == "inClinic" ? (
            <FaClinicMedical className="!flex items-center !text-gray-200 !text-xl" />
          ) : appointmentType == "chat" ? (
            <BiMessageAltDetail className="!flex items-center !text-gray-200 !text-xl" />
          ) : null}
          <span className="text-white font-medium">
            {appointmentType?.toUpperCase()}
          </span>
        </div>
        <div className={`flex gap-2 bg-gray-400/40 p-2 rounded-lg`}>
          {/* <PoundCircleOutlined className="!flex items-center !text-yellow-200 !text-2xl" /> */}
          <span className="text-white font-medium">{appointmentFees} L.E</span>
        </div>
      </div>
      <hr className="w-full my-2" />
      <div className="w-full text-center">
        <span className="text-white font-medium">{slotTime}</span>
      </div>
    </div>
  );
};

export default BookButton;
