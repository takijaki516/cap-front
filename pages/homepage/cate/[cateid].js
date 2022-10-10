import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { modalState, modalTypeState } from "../../../atoms/modalAtom";

import Header from "../../../components/Header";
import posts from "../../../dummydata/posts.json";
import Feed from "../../../components/Feed";
import Modal from "../../../components/Modal";

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
      <main>{router.query.cateid}</main>
    </div>
  );
};

export default index;
