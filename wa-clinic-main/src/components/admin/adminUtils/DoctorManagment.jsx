import React, { useState } from "react";
import { Avatar, Button, Space, Table, Tag } from "antd";
import { useDoctorsContext } from "../../../contexts/DoctorsContextProvider";
import { SlotsContextProvider } from "../../../contexts";
import { ScheduleOutlined } from "@ant-design/icons";
import "./DoctorManagment.css";
import changeState from "../adminServices/changeState";
import { useUserContext } from "../../../contexts/UserContextProvider";
import AppointmentDetails from "./AppointmentDetails";
const columns = [
  Table.EXPAND_COLUMN,
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (rec) => (
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar src={rec?.img_url} />
        <span className="font-medium">{rec?.nick_name}</span>
      </div>
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
const DoctorManagment = ({ socket }) => {
  const { isLoading, doctorsData, fetchDoctorsData } = useDoctorsContext();
  const { fetchUserData, messageApi } = useUserContext();
  const [openKey, setOpenKey] = useState();
  const [isVerLoading, setIsLoading] = useState(false);
  const doctorsDetails = doctorsData?.map(
    ({ doctor_id, fees, img_url, nick_name, specialty, is_verified }) => ({
      key: doctor_id,
      specialty: <span className="">{specialty}</span>,
      verified: is_verified,
      action: (
        <div className="flex flex-col gap-2 items-center">
          {!is_verified && (
            <Button
              onClick={() =>
                changeState(
                  fetchUserData,
                  fetchDoctorsData,
                  messageApi,
                  setIsLoading,
                  "verified",
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
            pagination={{ pageSize: 5 }}
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
