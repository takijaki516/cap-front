import { Avatar, IconButton } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

import Head from "next/head";
import Image from "next/image";

import Header from "../../components/Header";
import user from "../../dummydata/users.json";
import post from "../../dummydata/posts.json";

const PostPage = () => {
  return (
    <div className="bg-neutral-500 h-screen overflow-y-scroll md:space-y-6 ">
      <Head>
        <title>캡스톤</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-col md:flex-row justify-center  gap-x-5 px-4 sm:px-12">
        <div className="bg-[#1D2226] text-white  space-y-2 py-2.5">
          <div className="flex items-center px-2.5 cursor-pointer">
            <Avatar src={user.image} className="!h-10 !w-10 cursor-pointer" />

            <div className="mr-auto ml-2">
              <h6>{user.nickname}</h6>
              <p>{user.email}</p>
            </div>

            <IconButton>
              <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
            </IconButton>
          </div>

          <hr className="mx-2" />

          <div className="flex-col space-y-2">
            {/* 내용 부분 */}
            <div className="px-2.5 break-all md:break-normal ">
              <p>{post[0].content}</p>
            </div>

            {/* 사진 */}
            <div className="relative h-60">
              <Image src={post[0].image_src} layout="fill" />
            </div>

            {/* 밑에 버튼 부분 */}
            <div
              className="flex justify-center items-center border-t 
                     border-white mx-3 pt-2"
            >
              <button className="postButton">
                <CommentOutlinedIcon />
                <h4>댓글</h4>
              </button>

              <button className="postButton ">
                <DeleteRoundedIcon />
                <h4>삭제/공유(구현)</h4>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
