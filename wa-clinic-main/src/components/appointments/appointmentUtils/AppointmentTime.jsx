import { Table } from "antd";
import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import CountdownTimer from "./CountdownTimer";
let k;
const AppointmentTime = ({
  appointmentId,
  appointment_state,
  schedule_date,
  slot_time,
  doctorId,
  patientId,
  getAppointmentVal,
  fetchAppointmentData,
  order,
  date,
}) => {
  useEffect(() => {
    const timeStamp = new Date(schedule_date + " " + slot_time) - new Date();
    if (appointment_state == "booked" && !isNaN(timeStamp)) {
      const timeId = setTimeout(() => {
        fetchAppointmentData(
          true,
          new Cookies().get("accessToken"),
          true,
          {
            schedule_date,
            slot_time,
            doctorId,
            patientId,
            appointmentId,
          },
          {
            date,
          }
        );
      }, [timeStamp < 0 ? 0 : timeStamp]);
      return () => clearTimeout(timeId);
    }
  }, [schedule_date, slot_time, appointment_state]);
  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-wrap grow gap-2 justify-center items-center">
        <div className="text-white grow bg-gray-300/50 rounded-lg p-1 font-medium text-center">
          {/* <span className="text-gray-700">Appointment date</span>
          <hr className="border-gray-700" /> */}
          <div className="text-white flex justify-center">
            <table className="grow">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="border-r border-gray-300 p-1 bg-gray-500">
                    Day
                  </td>
                  <td className="border-r border-gray-300 p-1 bg-gray-500">
                    Date
                  </td>
                  <td className="p-1 bg-gray-500">
                    Appointment
                    <br /> Time
                  </td>
                </tr>
                <tr className="">
                  <td className="border-r border-gray-300 p-1">
                    {new Date(schedule_date).toLocaleString("en-us", {
                      weekday: "long",
                    })}
                  </td>
                  <td className="border-r border-gray-300 p-1">
                    {schedule_date}
                  </td>
                  <td>{slot_time}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {appointment_state == "booked" && (
          <div className="text-white bg-gray-300/50 rounded-lg p-1 font-medium text-center">
            <span className="text-gray-700 font-medium text-base lg:text-lg 2xl:text-xl">
              Remaining Time
            </span>
            <hr className="border-gray-700" />
            <CountdownTimer
              order={order}
              targetDate={new Date(schedule_date + " " + slot_time)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentTime;
