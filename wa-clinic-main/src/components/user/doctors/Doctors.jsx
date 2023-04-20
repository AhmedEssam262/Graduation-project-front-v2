import React, { forwardRef, useEffect, useState } from "react";
import { Empty } from "antd";
import Loader from "../../Loader";
import { DoctorCard, SearchFilter } from "./doctorsUtils";
import doctorPhoto from "./../../../images/doctorPhoto.png";
import { useDoctorsContext } from "../../../contexts/DoctorsContextProvider";

const Doctors = forwardRef(({ home, user }, ref) => {
  const { doctorsData, isLoading, fetchDoctorsData } = useDoctorsContext();
  return (
    <>
      <div className="relative">
        {!home ? (
          <>
            <SearchFilter ref={ref} fetchDoctorsData={fetchDoctorsData} />
          </>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-evenly gap-2">
        {
          doctorsData?.length > 0 ? (
            doctorsData?.map((record) => (
              <DoctorCard
                user={user}
                key={record?.doctor_id}
                doctorId={record?.doctor_id}
                username={record?.user_name}
                profileImage={record?.img_url || doctorPhoto}
                rate={record?.rate}
                fees={record?.fees}
                doctorName={record?.nick_name}
                about={record?.about}
                specialty={record?.specialty}
              />
            ))
          ) : isLoading ? (
            <Loader />
          ) : null
          // (
          //   <Empty
          //     className="!mt-20 !mb-4 !font-medium"
          //     description="There's no doctors exists"
          //   />
          // )
        }
      </div>
    </>
  );
});
export default Doctors;
