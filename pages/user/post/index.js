import { useState, useEffect } from "react";
import Head from "next/head";
import Axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Header from "../../../components/Header";
import { useAuthState } from "../../../context/auth";

const UserPostPage = () => {
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
  const getProductByCateQueryFn = async ({ queryKey }) => {
    const [_key, cateId] = queryKey;
    const data = await Axios.get(
      `http://110.12.218.147:8080/api/v1/boards/category?category_id=${cateId}`
    );
    return data;
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["boards", cateId],
    queryFn: getProductByCateQueryFn,
    enabled: !!cateId,
  });

  // render
  if (!!userEmail && isSuccess) {
    console.log(data);

    return (
      <div className="bg-[#F3F2EF] h-screen overflow-y-scroll md:space-y-6">
        <Head>
          <title>캡스톤</title>
        </Head>
        <Header />
        asdf
      </div>
    );
  }
};

export default UserPostPage;
