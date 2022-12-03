import { useEffect, useState } from "react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuthState } from "../../../context/auth";
import ChatList from "../../../components/ChatList";
import Header from "../../../components/Header";
import ChatListItem from "../../../components/ChatListItem";

const ReceivedMsgPage = () => {
  const router = useRouter();
  const { userEmail, setUserEmail, useEmailFetch } = useAuthState();
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
  const getMessageByUser = async () => {
    const data = await Axios.get(`http://110.12.218.147:8080/api/v1/messages`, {
      headers: {
        Authorization: token,
      },
    });

    return data;
  };

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["receivedMsg"],
    queryFn: async () => {
      try {
        return await getMessageByUser();
      } catch {
        setUserEmail("");
        localStorage.removeItem("auth");
        router.push("/");
        return;
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

  if (!!userEmail && isSuccess) {
    return (
      <div>
        <Head>
          <title>캡스톤</title>
        </Head>
        <Header />

        <ChatList pageTitle={router.pathname.split("/").pop()}>
          {data.data.data.map((item) => (
            <ChatListItem
              key={item.message_id}
              showReplyBtn={true}
              item={item}
            />
          ))}
        </ChatList>
      </div>
    );
  }
};

export default ReceivedMsgPage;
