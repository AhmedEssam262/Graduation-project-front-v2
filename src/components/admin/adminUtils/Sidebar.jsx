import React from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineCancel,
  MdOutlineManageAccounts,
  MdPostAdd,
} from "react-icons/md";
import { DashboardOutlined, HomeOutlined } from "@ant-design/icons";
import { GiDoctorFace } from "react-icons/gi";
const links = [
  {
    title: "Dashboard",
    links: [
      {
        link: "doctors",
        key: "doctor",
        value: "Doctors Managment",
        icon: <MdOutlineManageAccounts />,
      },
    ],
  },
  {
    title: "General",
    links: [
      {
        link: "",
        key: "home",
        value: "Home",
        icon: <HomeOutlined />,
      },
      {
        link: "doctors",
        key: "doctors",
        value: "Doctors",
        icon: <GiDoctorFace />,
      },
      {
        link: "posts",
        key: "posts",
        value: "Questions",
        icon: <MdPostAdd />,
      },
    ],
  },
];
const Sidebar = ({
  activeMenu,
  setActiveMenu,
  isMobile,
  setDashType,
  dashType,
}) => {
  const handleCloseSideBar = (value) => {
    if (value) setDashType(value);
    if (activeMenu !== undefined && isMobile) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 px-4 pt-3 pb-2.5 rounded-lg  text-white bg-blue-700  text-md m-2";
  const normalLink =
    "flex items-center gap-5 px-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-100 m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/admin"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <DashboardOutlined />
              <span>Admin</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              className="text-xl text-gray-700 rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.title == "Dashboard"
                  ? item.links.map((link) => (
                      <button
                        key={link.key}
                        onClick={() => handleCloseSideBar(link.key)}
                        className={
                          link.key == dashType ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize ">{link.value}</span>
                      </button>
                    ))
                  : item.links.map((link) => (
                      <Link
                        to={`/${link.link}`}
                        key={link.key}
                        onClick={() => handleCloseSideBar()}
                        className={
                          link.key == dashType ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize ">{link.value}</span>
                      </Link>
                    ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;