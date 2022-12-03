import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { useAuthState } from "../../context/auth";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Grid from "../../components/Grid";
import Card from "../../components/Card";

import Hero from "../../components/Hero";

const HomePage = () => {
  const { userEmail, useEmailFetch } = useAuthState();

  useEmailFetch();

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const data = await Axios.get("http://110.12.218.147:8080/api/v1/boards");
      return data;
    },
  });

  if (!userEmail) {
    return (
      <Link href="/">
        <div>로그인 해주세요</div>
      </Link>
    );
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
          {/* 링크 까지 넣어주었음 */}
          {data.data.data.map((post) => (
            <Link key={post.board_id} href={`/board/${post.board_id}`}>
              <div className="cursor-pointer hover:opacity-80 duration-300">
                <Card
                  boardStatus={post.status}
                  imgUrl={post.imageReturnFormList[0]}
                  title={post.title}
                />
              </div>
            </Link>
          ))}
        </Grid>
      </div>
    );
  }
  return <div>haha</div>;
};

export default HomePage;
