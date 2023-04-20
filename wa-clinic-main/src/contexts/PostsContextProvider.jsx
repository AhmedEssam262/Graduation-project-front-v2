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
const PostsData = createContext(null);
const PostsContextProvider = ({ children, noFirstRender, query }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [postsData, setPostsData] = useState(null);
  const host = window?.location?.hostname;
  const fetchPostsData = async (query, noRender) => {
    if (!noRender) setIsLoading(true);
    try {
      const { data } = await axios.request(
        `http://127.0.0.1:8000/api/get/posts${handleQuery(query)}`,
        {
          timeout: 10000,
        }
      );
      setPostsData(() => data?.data);
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };
  useLayoutEffect(() => {
    if (!noFirstRender) fetchPostsData(query);
  }, []);
  return (
    <PostsData.Provider value={{ isLoading, postsData, fetchPostsData }}>
      {children}
    </PostsData.Provider>
  );
};

export default PostsContextProvider;

export const usePostsContext = () => useContext(PostsData);
