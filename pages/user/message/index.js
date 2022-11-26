import { useState } from "react";
import { useAuthState } from "../../../context/auth";
import Head from "next/head";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const UserMessagePage = () => {
  const { userEmail, setUserEmail } = useAuthState();

  const [token, setToken] = useState("");

  // token 확인
  useEffect(() => {
    const storageData = localStorage.getItem("auth");
    if (!!storageData) {
      const tokenData = JSON.parse(storageData).data;
      setToken(tokenData);

      console.log(userEmail);
    } else {
      setToken("");
    }
  }, []);

  // query function
  const getMessageByUser = async ({ queryKey }) => {
    const [_key, _token] = queryKey;
    const data = await Axios.get(`http://110.12.218.147:8080/api/v1/messages`);
    return data;
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["messages", token],
    queryFn: getMessageByUser,
    enabled: !!token,
  });

  console.log(data);

  return <div>UserMessagePage</div>;
};

export default UserMessagePage;
