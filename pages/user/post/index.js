import { useState, useEffect } from "react";
import Head from "next/head";
import Axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

import Header from "../../../components/Header";
import { useAuthState } from "../../../context/auth";
import Table from "../../../components/Table";
import TableItem from "../../../components/TableItem";

const UserPostPage = () => {
  const { userEmail, useEmailFetch, setUserEmail } = useAuthState();
  const router = useRouter();
  const [token, setToken] = useState("");

  useEmailFetch();

  // token 확인
  useEffect(() => {
    const storageData = localStorage.getItem("auth");
    if (!!storageData) {
      const tokenData = JSON.parse(storageData).data;
      setToken(tokenData);
    } else {
      setToken("");
    }
  }, []);

  // query function
  const getBoardByUser = async () => {
    const data = await Axios.get(
      `http://110.12.218.147:8080/api/v1/board/myboard`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["userBoard"],
    queryFn: async () => {
      try {
        return await getBoardByUser();
      } catch {
        if (data.data.data === "tokenError") {
          setUserEmail("");
          localStorage.removeItem("auth");
          router.push("/");
          return;
        }
      }
    },
    enabled: !!token,
  });

  if (!userEmail) {
    return (
      <Link href="/">
        <div>로그인 해주세요</div>
      </Link>
    );
  }

  // render
  if (!!userEmail && isSuccess) {
    return (
      <div className="bg-[#F3F2EF]">
        <Head>
          <title>캡스톤</title>
        </Head>
        <Header />

        <Table>
          {data.data.data.map((item) => (
            // console.log(item)
            <TableItem key={item.board_id} item={item} />
          ))}
        </Table>
      </div>
    );
  }
};

export default UserPostPage;
