import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuthState } from "../../context/auth";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Grid from "../../components/Grid";
import Card from "../../components/Card";

import posts from "../../dummydata/posts.json";
import Hero from "../../components/Hero";
import { useEffect } from "react";

const index = () => {
  const { userEmail, setUserEmail } = useAuthState();

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

  if (!!userEmail) {
    return (
      <div className="bg-[#F3F2EF] h-screen overflow-y-scroll md:space-y-6">
        <Head>
          <title>캡스톤</title>
        </Head>

        <Header />

        <Hero />
        <Input className="p-4 max-w-7xl m-auto" />

        <Grid className="p-4 max-w-7xl m-auto" title="전체 상품">
          {posts.map((post) => (
            <Link key={post.id} href={`/postpage/${post.id}`}>
              <div className="cursor-pointer hover:opacity-80 duration-300">
                <Card imgUrl={post.image_src} title={post.title} />
              </div>
            </Link>
          ))}
        </Grid>
      </div>
    );
  }
};

export default index;
