import React, { useEffect, useState } from "react";
import { cancelAppointment } from "../doctorDashboard/dashboardServices";
import { RiDeleteBack2Line } from "react-icons/ri";
const PopUp = ({
  children,
  show,
  mt,
  handleClose,
  customWidth,
  closeColor,
}) => {
  const [showPop, setShowPop] = useState(false);
  useEffect(() => {
    let timeId;
    if (!show) {
      timeId = setTimeout(() => setShowPop(show), 500);
    } else setShowPop(show);
    return () => clearTimeout(timeId);
  }, [show]);
  return (
    <>
      {(showPop ? showPop : show) && (
        <div
          style={{
            backdropFilter: "blur(20px)",
          }}
          className={`mask--booked transition-all duration-500 fixed flex z-40 items-start justify-center top-0 left-0 h-full w-full`}
        >
          <div
            style={{
              marginTop: mt ? mt : "30vh",
              maxHeight: mt ? `calc(100vh - ${mt})` : "70vh",
            }}
            className={`bg-white overflow-auto scroll--v scroll--h h-fit relative ${
              customWidth ? `${customWidth}` : "w-3/4 sm:w-1/2"
            } transition-all duration-500  ${
              showPop ? (!show ? "-left-full" : "left-0") : "-left-full"
            } p-4 rounded-lg shadow-lg`}
          >
            <RiDeleteBack2Line
              onClick={handleClose}
              className={`!flex cursor-pointer ${
                closeColor ? closeColor : "!text-gray-700 hover:!text-gray-800"
              } !justify-center ml-auto my-2 !items-center !text-4xl`}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
