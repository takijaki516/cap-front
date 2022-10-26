import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { modalState, modalTypeState } from "../../atoms/modalAtom";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Grid from "../../components/Grid";
import Card from "../../components/Card";

import posts from "../../dummydata/posts.json";
import Hero from "../../components/Hero";

const index = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  const router = useRouter();

  return (
    <div className="bg-[#F3F2EF] h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>캡스톤</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Hero />
      <Input className="p-4 max-w-7xl m-auto" />

      <Grid className="p-4 max-w-7xl m-auto" title="일단 홈페이지">
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
};

export default index;
