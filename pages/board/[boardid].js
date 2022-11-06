import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAuthState } from "../../context/auth";
import SingleBoard from "../../components/SingleBoard";

const SingleBoardPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log("router", router.query.boardid);

  const boardId = router.query.boardid;

  const { userEmail, setUserEmail } = useAuthState();

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["singleProduct", boardId],
    queryFn: async () => {
      const data = await Axios.get(`https://dummyjson.com/products/${boardId}`);
      return data;
    },
  });

  console.log("data", data);

  useEffect(() => {
    const storageData = localStorage.getItem("auth");
    if (!!storageData) {
      const emailData = JSON.parse(storageData).email;
      setUserEmail(emailData);
    } else {
      setUserEmail("");
    }
  }, []);

  if (!userEmail) {
    return (
      <div>
        <Link href="/">로그인 해주세요</Link>
      </div>
    );
  }

  if (!isSuccess) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <SingleBoard data={data.data} />
    </div>
  );
};

export default SingleBoardPage;
