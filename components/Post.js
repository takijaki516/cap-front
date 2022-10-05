import { Avatar, IconButton } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { handlePostState, getPostState } from "../atoms/postAtom";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import user from "../dummydata/users.json";

const Post = ({ post, modalPost }) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);

  const [showInput, setShowInput] = useState(false);

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;

  // delete post api기능 구현 해야함 restful 하게 주소: DELETE: /api/posts/post_id
  const deletePost = async () => {};

  return (
    <div className="bg-[#1D2226] text-white rounded-lg space-y-2 py-2.5">
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={user.image} className="!h-10 !w-10 cursor-pointer" />

        <div className="mr-auto ml-2">
          <h6>{user.nickname}</h6>
          <p>{user.email}</p>
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>

      <hr className="mx-2" />

      <div className="flex-col space-y-2">
        {/* 내용 부분 */}
        <div className="px-2.5 break-all md:break-normal ">
          <div className="px-2.5 break-all md:break-normal">
            {modalPost || showInput ? (
              <p onClick={() => setShowInput(false)}>{post.content}</p>
            ) : (
              <p onClick={() => setShowInput(true)}>
                {truncate(post.content, 150)}
              </p>
            )}
          </div>
        </div>

        {!modalPost && (
          <img
            src={post.image_src}
            alt=""
            className="w-full cursor-pointer"
            onClick={() => {
              setModalOpen(true);
              setModalType("gifYouUp");
              setPostState(post);
            }}
          />
        )}

        {/* 밑에 버튼 부분 */}
        <div
          className="flex justify-center items-center border-t  border-white mx-3
                    pt-2"
        >
          <button className={`postButton`} onClick={() => setLiked(!liked)}>
            <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            <h4>좋아요</h4>
          </button>

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
  );
};

export default Post;
