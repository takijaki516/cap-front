import Head from "next/head";
import React from "react";
import Form from "../../components/Form";
import Header from "../../components/Header";

const formpage = () => {
  return (
    <div className="bg-[#F3F2EF] h-screen overflow-y-scroll md:space-y-6">
      <Header />

      <Head>
        <title>게시글 등록</title>
      </Head>

      <main
        className="flex flex-col md:flex-row justify-center
       gap-x-5 px-4 sm:px-12"
      >
        <Form />
      </main>
    </div>
  );
};

export default formpage;
