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
    queryKey: ["products"],
    queryFn: async () => {
      const data = await Axios.get("https://dummyjson.com/products");
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
    return (
      <div className="bg-[#F3F2EF] h-screen overflow-y-scroll md:space-y-6">
        <Head>
          <title>캡스톤</title>
        </Head>

        <Header />

        <Hero />
        <Input className="p-4 max-w-7xl m-auto" />

        <Grid className="p-4 max-w-7xl m-auto" title="전체 상품">
          {data.data.products.map((post) => (
            <Link key={post.id} href={`/board/${post.id}`}>
              <div className="cursor-pointer hover:opacity-80 duration-300">
                <Card imgUrl={post.images[0]} title={post.title} />
              </div>
            </Link>
          ))}
        </Grid>
      </div>
    );
  }
};

export default index;
