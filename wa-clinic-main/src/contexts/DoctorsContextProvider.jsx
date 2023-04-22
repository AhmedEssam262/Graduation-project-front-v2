import axios from "axios";
import { createContext, useState, useContext, useLayoutEffect } from "react";

const DoctorsData = createContext(null);
const DoctorsContextProvider = ({ children, query, noFirstRender }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [doctorsData, setDoctorsData] = useState(null);
  const host = window?.location?.hostname;
  const fetchDoctorsData = async (setQuery, noWaiting) => {
    query = setQuery ? setQuery : query;
    if (!noWaiting) setIsLoading(true);
    try {
      const { data } = await axios.request(
        `http://127.0.0.1:8000/api/doctors${
          query
            ? `?${query.total ? `total=${query.total}&` : ""}${
                query.limit ? `limit=${query.limit}&` : ""
              }${query.specialty ? `specialty=${query.specialty}&` : ""}${
                query.dname ? `dname=${query.dname}&` : ""
              }`
            : ""
        }`,
        { timeout: 10000 }
      );
      setDoctorsData(data?.data);
      setIsLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setDoctorsData(null);
      setIsLoading(false);
    }
  };
  useLayoutEffect(() => {
    if (!noFirstRender) fetchDoctorsData(query);
  }, []);
  return (
    <DoctorsData.Provider value={{ isLoading, doctorsData, fetchDoctorsData }}>
      {children}
    </DoctorsData.Provider>
  );
};

export default DoctorsContextProvider;

export const useDoctorsContext = () => useContext(DoctorsData);
