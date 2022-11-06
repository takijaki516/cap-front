import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "axios";

import Card from "../../../components/Card";
import Grid from "../../../components/Grid";
import Header from "../../../components/Header";
import Hero from "../../../components/Hero";
import Input from "../../../components/Input";

import { useAuthState } from "../../../context/auth";

import cateItems from "../../../dummydata/menuitem.json";
import CategoryName from "../../../components/CategoryName";

const index = () => {
  const { userEmail, setUserEmail } = useAuthState();
  const [categoryName, setCategoryName] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    cateItems.map((level1) => {
      level1.item.map((level2) => {
        if (level2.cate_id === router.query.cateid) {
          setCategoryName(level2.item_name);
        }
      });
    });
  }, [router]);

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
        {/* 
        <CategoryName
          cateName={categoryName}
          className="p-4 max-w-7xl m-auto"
        /> */}

        <Input className="p-4 max-w-7xl m-auto" />

        <Grid className="p-4 max-w-7xl m-auto" title={categoryName}>
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
