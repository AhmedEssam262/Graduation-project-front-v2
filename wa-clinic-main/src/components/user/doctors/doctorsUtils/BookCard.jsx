import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSlotsContext } from "../../../../contexts/SlotsContextProvider";
import { Button, Empty } from "antd";
import { Link } from "react-router-dom";
import Loader from "../../../Loader";
import DatePicker from "./DatePicker";
const BookCard = ({ doctorId }) => {
  const { slotsData, isLoading, fetchSlotsData } = useSlotsContext();
  const [bookedSlot, setBookedSlot] = useState();
  const [selectedDate, setSelectedDate] = useState(() => ({
    count: 0,
    date: dayjs().format("YYYY-MM-DD"),
  }));
  useEffect(() => {
    fetchSlotsData({
      date: selectedDate.date,
      doctorId,
    });
  }, [selectedDate.date]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="doctor--slots sm:w-1/3 xl:w-2/5 flex flex-col mr-2 shadow-lg rounded bg-gray-200"
    >
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="flex flex-col grow justify-center items-center">
        {slotsData?.freeSlots?.length > 0 ? (
          <>
            <div
              className="flex my-2 shadow-2xl p-2 grow flex-col scroll--v w-3/4"
              style={{
                height: "200px",
                overflow: "auto",
              }}
            >
              {slotsData?.freeSlots?.map(({ slotTime: value }, i) => (
                <span
                  key={value + i}
                  className={`p-2 my-1 cursor-pointer text-center select-none rounded text-white font-medium
          inline-block ${
            bookedSlot == value
              ? "bg-orange-700"
              : "hover:bg-gray-600 bg-gray-700"
          }`}
                  onClick={() =>
                    setBookedSlot((val) => (val == value ? null : value))
                  }
                >
                  {value}
                </span>
              ))}
            </div>
            <Button
              className={`!flex !justify-center !items-center ${
                bookedSlot
                  ? "!bg-gray-700 hover:!text-blue-300"
                  : "!bg-gray-400 cursor-not-allowed"
              } py-1.5 hover:!text-gray-200
            !text-white font-mono
    !rounded w-full !text-xs lg:!text-sm`}
              style={{
                height: "35px",
              }}
              disabled={bookedSlot ? false : true}
              onClick={() => (bookedSlot ? "" : null)}
            >
              Book Now
            </Button>
          </>
        ) : isLoading ? (
          <Loader />
        ) : slotsData?.freeSlots ? (
          <Empty
            description={
              <span className="font-medium text-gray-700">
                all slots booked
              </span>
            }
          />
        ) : (
          <Empty
            className="w-full flex flex-col items-center"
            description={
              <div className="font-medium text-gray-700">
                there's no slots available
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default BookCard;
