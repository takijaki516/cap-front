import React from "react";
import Image from "next/image";
import Head from "next/head";
import Header from "./Header";

const SingleBoard = ({ data }) => {
  return (
    <div>
      <Head>
        <title>보드</title>
      </Head>

      <Header />

      <div className="flex flex-col items-center mt-10 space-y-4">
        <div className="font-bold text-3xl">{data.title}</div>
        <div className="font-bold">
          <span className="text-sm font-medium text-gray-600">작성자 :</span>{" "}
          유저 아이디
        </div>

        <div className="relative h-40 w-40">
          <Image src={data.images[0]} layout="fill" />
        </div>

        <div>{data.description}</div>

        <div className="flex space-x-4 font-bold">
          <div className="bg-blue-400 p-4 cursor-pointer">쪽지</div>
          <div className="bg-red-400 p-4 cursor-pointer">좋아요 ???</div>
        </div>
      </div>
    </div>
  );
};

export default SingleBoard;
