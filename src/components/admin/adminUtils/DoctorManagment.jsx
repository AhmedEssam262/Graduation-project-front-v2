import React, { useState } from "react";
import { Avatar, Button, Space, Table, Tag } from "antd";
import { useDoctorsContext } from "../../../contexts/DoctorsContextProvider";
import { SlotsContextProvider } from "../../../contexts";
import { ScheduleOutlined } from "@ant-design/icons";
import "./DoctorManagment.css";
import changeState from "../adminServices/changeState";
import { useUserContext } from "../../../contexts/UserContextProvider";
import AppointmentDetails from "./AppointmentDetails";
import doctorPhoto from "../../../images/doctorPhoto.png";
import { Link } from "react-router-dom";
import PopUp from "../../utils/PopUp";
import ClinicDetails from "../../user/profile/profileUtils/ClinicDetails";
const columns = [
  Table.EXPAND_COLUMN,
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (rec, record) => (
      <Link
        to={`/profile/${record?.key}`}
        className="flex flex-col bg-gray-200/80 hover:bg-gray-200 px-4 py-2 text-center rounded-md shadow-md justify-center items-center gap-2"
      >
        <Avatar src={rec?.img_url || doctorPhoto} size="large" />
        <span className="font-medium text-gray-600">{rec?.nick_name}</span>
      </Link>
    ),
  },
  {
    title: "Specialty",
    dataIndex: "specialty",
    key: "specialty",
  },
  {
    title: "State",
    key: "state",
    dataIndex: "verified",
    render: (value) => (
      <Tag color={value ? "blue" : value == 0 ? "red" : "gold"}>
        {value ? "VERIFIED" : value == 0 ? "REJECTED" : "PENDING"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];
const appendValue = (val1, val2) => (val1 && val2 ? `${val1} ${val2}` : "");
const DoctorManagment = ({ socket, timeZone }) => {
  const { isLoading, doctorsData, fetchDoctorsData } = useDoctorsContext();
  const { fetchUserData, messageApi } = useUserContext();
  const [openKey, setOpenKey] = useState();
  const [doctorRecord, setDoctorRecord] = useState();
  const [showPopUp, setShowPopUp] = useState();
  console.log(doctorsData);
  const [isVerLoading, setIsLoading] = useState(false);
  const doctorsDetails = doctorsData?.map(
    (
      {
        doctor_id,
        fees,
        img_url,
        nick_name,
        specialty,
        is_verified,
        clinic_street,
      },
      i
    ) => ({
      key: doctor_id,
      specialty: <span className="">{specialty}</span>,
      verified: is_verified,
      action: (
        <div className="flex flex-col gap-2 items-center">
          {clinic_street && (
            <Button
              onClick={() => {
                setDoctorRecord(doctorsData?.[i]);
                setShowPopUp(true);
              }}
              className="!bg-green-400 hover:!bg-green-600 !rounded-lg !font-medium !text-white"
            >
              Clinic Details
            </Button>
          )}
          {!is_verified && (
            <Button
              onClick={() =>
                changeState(
                  fetchUserData,
                  fetchDoctorsData,
                  messageApi,
                  setIsLoading,
                  "verify",
                  doctor_id
                )
              }
              className="!bg-blue-400 hover:!bg-blue-600 !rounded-lg !font-medium !text-white"
            >
              VERIFY
            </Button>
          )}
          {is_verified !== 0 && (
            <Button
              onClick={() =>
                changeState(
                  fetchUserData,
                  fetchDoctorsData,
                  messageApi,
                  setIsLoading,
                  "reject",
                  doctor_id
                )
              }
              className="!bg-red-400 hover:!bg-red-600 !rounded-lg !font-medium !text-white"
            >
              REJECT
            </Button>
          )}
        </div>
      ),
      name: {
        nick_name,
        img_url,
      },
    })
  );
  // console.log(openKey);
  return (
    <div className="px-4 admin--table">
      <PopUp
        show={showPopUp}
        mt="80px"
        customWidth={"w-5/6 sm:w-4/5 lg:w-3/4"}
        handleClose={() => {
          setShowPopUp(null);
          setTimeout(() => setDoctorRecord(null), 400);
        }}
      >
        <ClinicDetails admin={true} clinicValues={doctorRecord} />
      </PopUp>
      <div
        className="flex overflow-auto scroll--h"
        style={{
          height: `calc(100vh - 75px)`,
        }}
      >
        <div className="grow">
          <Table
            expandable={{
              expandedRowRender: (record) => {
                return (
                  <SlotsContextProvider>
                    <AppointmentDetails
                      socket={socket}
                      timeZone={timeZone}
                      fetchUserData={fetchUserData}
                      messageApi={messageApi}
                      doctorId={record?.key}
                    />
                  </SlotsContextProvider>
                );
              },
              expandedRowKeys: [openKey],
              onExpand: (exp, record) =>
                setOpenKey(() => (!exp ? null : record?.key)),
              // expandIcon: (record) => (
              //   <ScheduleOutlined
              //     onClick={() =>
              //       setOpenKey((key) =>
              //         key === record?.record?.key ? null : record?.record?.key
              //       )
              //     }
              //     className="text-sm cursor-pointer"
              //   />
              // ),
            }}
            pagination={doctorsData?.length > 4 ? { pageSize: 4 } : false}
            columns={columns}
            loading={isLoading}
            dataSource={doctorsDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorManagment;
