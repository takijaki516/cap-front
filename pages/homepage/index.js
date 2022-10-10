import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { modalState, modalTypeState } from "../../atoms/modalAtom";

import Header from "../../components/Header";
import Feed from "../../components/Feed";
import Modal from "../../components/Modal";
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
      <Input />

      {/* <Sidebar className="grow" /> */}
      {/* <Feed posts={posts} /> */}
      <Grid className="p-4 max-w-7xl m-auto" title="일단 홈페이지">
        {posts.map((post) => (
          <Link key={post.id} href={`/${post.id}`}>
            <div className="cursor-pointer hover:opacity-80 duration-300">
              <Card imgUrl={post.image_src} title={post.title} />
            </div>
          </Link>
        ))}
      </Grid>

      {/* 
      모달 부분
      <AnimatePresence>
        {modalOpen && (
          <Modal handleClose={() => setModalOpen(false)} type={modalType} />
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default index;
