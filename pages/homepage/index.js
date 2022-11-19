import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAuthState } from "../../context/auth";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Grid from "../../components/Grid";
import Card from "../../components/Card";

import Hero from "../../components/Hero";

const index = () => {
  const { userEmail, setUserEmail } = useAuthState();

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const data = await Axios.get("http://110.12.218.147:8080/api/v1/boards");
      return data;
    },
  });

  useEffect(() => {
    const storageData = localStorage.getItem("auth");
    if (!!storageData) {
      const emailData = JSON.parse(storageData).email;
      console.log(emailData);
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

  if (!!userEmail && isSuccess) {
    console.log(data.data.data);
  }

  if (!!userEmail && isSuccess) {
    return (
      <div className="bg-[#F3F2EF] h-screen overflow-y-scroll md:space-y-6">
        <Head>
          <title>캡스톤</title>
        </Head>

        <Header />

        <Hero />
        <Input className="p-4 max-w-7xl m-auto" />

        <Grid className="p-4 max-w-7xl m-auto" title="전체 상품">
          {data.data.data.map((post) => (
            <Link key={post.board_id} href={`/board/${post.board_id}`}>
              <div className="cursor-pointer hover:opacity-80 duration-300">
                <Card imgUrl={post.image} title={post.title} />
              </div>
            </Link>
          ))}
        </Grid>
      </div>
    );
  }
  return <div>haha</div>;
};

export default index;
