import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useAuthState } from "../../context/auth";
import { useModalState } from "../../context/modalContext";

import Header from "../../components/Header";
import SingleBoard from "../../components/SingleBoard";
import Modal from "../../components/Modal";

const SingleBoardPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [token, setToken] = useState("");

  const { userEmail, setUserEmail } = useAuthState();
  const { modalState } = useModalState();

  const boardId = router.query.boardid;

  useEffect(() => {
    const storageData = localStorage.getItem("auth");

    if (!!storageData) {
      const parsedData = JSON.parse(storageData);
      console.log(parsedData);
      setToken(parsedData.data);
      setUserEmail(parsedData.email);
    } else {
      setUserEmail("");
      setToken("");
    }
  }, []);

  // react query
  const getBoardByIdFn = async ({ queryKey }) => {
    const [_key, boardId] = queryKey;
    const data = await Axios.get(
      `http://110.12.218.147:8080/api/v1/board?board_id=${boardId}`
    );
    return data;
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["board", boardId],
    queryFn: getBoardByIdFn,
    enabled: !!boardId,
  });

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

  if (!!userEmail && isSuccess) {
    return (
      <div>
        <Head>
          <title>보드</title>
        </Head>

        <Header />
        <div className="w-5/6 mx-auto">
          <SingleBoard data={data.data.data} />
          {/*  쪽지 receiver email을 알지 못한다. */}
          <Modal boardOwner={data.data.data} token={token} />
        </div>
      </div>
    );
  }
};

export default SingleBoardPage;
