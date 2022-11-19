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

  const cateId = router.query.cateid;

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

  useEffect(() => {
    cateItems.map((level1) => {
      level1.item.map((level2) => {
        if (level2.cate_id === cateId) {
          setCategoryName(level2.item_name);
        }
      });
    });
  }, [cateId]);

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
    console.log(data);

    return (
      <div className="bg-[#F3F2EF] h-screen overflow-y-scroll md:space-y-6">
        <Head>
          <title>캡스톤</title>
        </Head>

        <Header />

        <Input className="p-4 max-w-7xl m-auto" />

        <Grid className="p-4 max-w-7xl m-auto" title={categoryName}>
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
};

export default index;
