import { useState } from "react";
import Image from "next/image";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";

import HeaderLink from "./HeaderLink";
import user from "../dummydata/users.json";

function Header() {
  return (
    <header
      className="sticky top-0 z-40  dark:bg-[#1D2226]
    flex items-cneter justify-around py-1.5 px-3 focus-within:shadow-lg"
    >
      {/* left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        <Image src={user.image} width={55} height={55} />

        <div
          className="flex items-center space-x-1 dark:md:bg-gray-700
        py-2.5 px-4 rounded w-full"
        >
          <input
            type="text"
            placeholder="카테고리 보여줄꺼임"
            className="hidden
          md:inline-flex bg-transparent text-sm focus:outline-none
          placeholder-black/70 dark:placeholder-white/70 flex-grow"
          />
        </div>
      </div>

      {/* right */}

      <div className="flex items-center space-x-6">
        <HeaderLink Icon={ChatIcon} text="내게시글" feed />
        <HeaderLink Icon={ChatIcon} text="쪽지" feed />
        <HeaderLink Icon={NotificationsIcon} text="알림" feed />
        <HeaderLink Icon={Avatar} text="회원정보" feed avatar />
        <HeaderLink Icon={Avatar} text="로그아웃" feed avatar />

        {/* 다크 모드 할까???*/}
      </div>
    </header>
  );
}

export default Header;
