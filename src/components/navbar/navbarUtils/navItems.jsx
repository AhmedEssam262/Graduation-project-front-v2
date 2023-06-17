import { GiDoctorFace, GiArchiveRegister } from "react-icons/gi";
import { FcRatings } from "react-icons/fc";
import { MdQuestionAnswer, MdReviews } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { SiGnuprivacyguard } from "react-icons/si";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import SignBanner from "../../sign/SignBanner";
import UserItem from "./UserItem";
import { isMobile } from "react-device-detect";
import { Avatar } from "antd";
import { ImProfile } from "react-icons/im";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const toDoctors = (val, navigate, DoctorRef) => {
  let specialty = val.domEvent.target.getAttribute("specialty");
  navigate("/doctors");
  let id = setInterval(() => {
    if (DoctorRef?.current) {
      clearInterval(id);
      const { specialtyValue, doctorName, setSearchFilter } =
        DoctorRef?.current;
      specialty = specialty == "all" ? "" : specialty;
      if (specialty != specialtyValue || doctorName) {
        setSearchFilter({ specialty, doctorName: "" });
      }
    }
  });
};
const subItems = [
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Internal medicine"
    >
      Internal medicine
    </div>,
    "Internal"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Pediatrics">
      Pediatrics
    </div>,
    "Pediatrics"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Surgery">
      Surgery
    </div>,
    "Surgery"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Family medicine"
    >
      Family medicine
    </div>,
    "Family"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Anesthesiology"
    >
      Anesthesiology
    </div>,
    "Anesthesiology"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Neurology">
      Neurology
    </div>,
    "Neurology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Emergency medicine"
    >
      Emergency medicine
    </div>,
    "Emergency"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Dermatology">
      Dermatology
    </div>,
    "Dermatology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Ophthalmology"
    >
      Ophthalmology
    </div>,
    "Ophthalmology"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Oncology">
      Oncology
    </div>,
    "Oncology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Obstetrics and gynaecology"
    >
      Obstetrics and gynaecology
    </div>,
    "Obstetrics"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Psychiatry">
      Psychiatry
    </div>,
    "Psychiatry"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="General surgery"
    >
      General surgery
    </div>,
    "General"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Urology">
      Urology
    </div>,
    "Urology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Nuclear medicine"
    >
      Nuclear medicine
    </div>,
    "Nuclear"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Diagnostic Radiology"
    >
      Diagnostic Radiology
    </div>,
    "Diagnostic"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Immunology">
      Immunology
    </div>,
    "Immunology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Physical therap"
    >
      Physical therapy
    </div>,
    "Physical"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Preventive healthcare"
    >
      Preventive healthcare
    </div>,
    "Preventive"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Medical genetics"
    >
      Medical genetics
    </div>,
    "Medical1"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Orthopedics">
      Orthopedics
    </div>,
    "Orthopedics"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Cardiology">
      Cardiology
    </div>,
    "Cardiology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Otorhinolaryngology"
    >
      Otorhinolaryngology
    </div>,
    "Otorhinolaryngology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Gastroenterology"
    >
      Gastroenterology
    </div>,
    "Gastroenterology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Plastic surgery"
    >
      Plastic surgery
    </div>,
    "Plastic"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Neurosurgery"
    >
      Neurosurgery
    </div>,
    "Neurosurgery"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Cardiothoracic surgery"
    >
      Cardiothoracic surgery
    </div>,
    "Cardiothoracic"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Pulmonology">
      Pulmonology
    </div>,
    "Pulmonology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Rheumatology"
    >
      Rheumatology
    </div>,
    "Rheumatology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Intensive care medicine"
    >
      Intensive care medicine
    </div>,
    "Intensive"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Geriatrics">
      Geriatrics
    </div>,
    "Geriatrics"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Endocrinology"
    >
      Endocrinology
    </div>,
    "Endocrinology"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Nephrology">
      Nephrology
    </div>,
    "Nephrology"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Hematology">
      Hematology
    </div>,
    "Hematology"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Pathology">
      Pathology
    </div>,
    "Pathology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Occupational medicine"
    >
      Occupational medicine
    </div>,
    "Occupational"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Clinical chemistry"
    >
      Clinical chemistry
    </div>,
    "Clinical1"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Public health"
    >
      Public health
    </div>,
    "Public"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Clinical pathology"
    >
      Clinical pathology
    </div>,
    "Clinical2"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Medical microbiology"
    >
      Medical microbiology
    </div>,
    "Medical2"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Pain management"
    >
      Pain management
    </div>,
    "Pain"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Anatomical pathology"
    >
      Anatomical pathology
    </div>,
    "Anatomical"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Primary care"
    >
      Primary care
    </div>,
    "Primary"
  ),
  getItem(
    <div className="text-white font-medium select-none" specialty="Radiology">
      Radiology
    </div>,
    "Radiology"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Vascular surgery"
    >
      Vascular surgery
    </div>,
    "Vascular"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Pediatric Hematology Oncology"
    >
      Pediatric Hematology Oncology
    </div>,
    "Pediatric1"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Spinal Cord Injury Medicine"
    >
      Spinal Cord Injury Medicine
    </div>,
    "Spinal"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Pediatric surgery"
    >
      Pediatric surgery
    </div>,
    "Pediatric2"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Oral and maxillofacial surgery"
    >
      Oral and maxillofacial surgery
    </div>,
    "Oral"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Colorectal surgery"
    >
      Colorectal surgery
    </div>,
    "Colorectal"
  ),
  getItem(
    <div
      className="text-white font-medium select-none"
      specialty="Developmental-Behavioral Pedia"
    >
      Developmental-Behavioral Pedia
    </div>,
    "Developmental"
  ),
];
const items = (
  navigate,
  location,
  DoctorRef,
  user,
  messageApi,
  setUserData,
  isMobile
) => [
  user
    ? getItem(
        <UserItem
          setUserData={setUserData}
          messageApi={messageApi}
          user={user}
        />,
        // <div className="inline-block">logout</div>,
        //<Link to="/" className="select-none">
        //<div>{user.nick_name}</div>
        //</Link>
        "user",
        user?.img_url ? (
          <Avatar src={user?.img_url} size="large" />
        ) : (
          <ImProfile className="!text-2xl !text-gray-200 !m-0" />
        )
      )
    : null,
  !(location.pathname == "/")
    ? getItem(
        <Link to="/" className="select-none">
          HomePage
        </Link>,
        "1",
        <HomeOutlined />
      )
    : null,
  !user
    ? getItem(
        <Link to="/login" className="select-none">
          Login
        </Link>,
        "login",
        <AiOutlineLogin />
      )
    : null,
  !user
    ? getItem(
        <Link to="/signup" className="select-none">
          SignUp
        </Link>,
        "signup",
        <SiGnuprivacyguard />
      )
    : null,
  ,
  user && user?.user_type !== "admin"
    ? getItem(
        <Link to="/appointments" className="select-none">
          My Appointment
        </Link>,
        "2",
        <GiArchiveRegister />
      )
    : null,
  getItem(
    <span className="select-none">Doctors</span>,
    "sub3",
    <GiDoctorFace className="-ml-1" />,
    [
      {
        ...getItem(
          <div className="text-white font-medium select-none" specialty="all">
            All Doctors
          </div>,
          "sub30"
        ),
        onClick: (val) => toDoctors(val, navigate, DoctorRef),
      },
      // ...subItems,
      {
        ...getItem("Specialty", "sub31", null, subItems),
        onClick: (val) => toDoctors(val, navigate, DoctorRef),
      },
    ]
  ),
  user
    ? getItem(
        <Link to="/chat" className="select-none">
          Chating
        </Link>,
        "4",
        <TiMessages />
      )
    : null,
  getItem(
    <Link to="/posts" className="select-none">
      Questions
    </Link>,
    "5",
    <MdQuestionAnswer />
  ),
  getItem(
    <Link to="/ratings" className="select-none">
      Ratings
    </Link>,
    "6",
    <FcRatings />
  ),
  getItem(
    <Link to="/feedbacks" className="select-none">
      Feedbacks
    </Link>,
    "7",
    <MdReviews />
  ),
];

export default items;
