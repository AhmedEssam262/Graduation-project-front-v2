import { message } from "antd";
import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  useLayoutEffect,
  useReducer,
} from "react";
const handleQuery = (obj) =>
  !obj
    ? ""
    : Object.entries(obj)
        .filter(([_, val]) => val || val === 0)
        .map(([name, val], i) =>
          i == 0 ? `?${name}=${val}` : `${name}=${val}`
        )
        .join("&");
const CommentsData = createContext(null);
const CommentsContextProvider = ({ children, noFirstRender, query }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentsData, setCommentsData] = useState(null);
  const host = window?.location?.hostname;
  const fetchCommentsData = async (query, noRender) => {
    if (!noRender) setIsLoading(true);
    try {
      const { data } = await axios.request(
        `http://127.0.0.1:8000/api/get/comments${handleQuery(query)}`,
        {
          timeout: 10000,
        }
      );
      setCommentsData(() => data?.data);
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };
  // useLayoutEffect(() => {
  //   if (!noFirstRender) fetchCommentsData(query);
  // }, []);
  return (
    <CommentsData.Provider
      value={{ isLoading, commentsData, fetchCommentsData }}
    >
      {children}
    </CommentsData.Provider>
  );
};

export default CommentsContextProvider;

export const useCommentsContext = () => useContext(CommentsData);