import Image from "next/image";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
import Link from "next/link";

import HeaderLink from "./HeaderLink";
import Dropdown from "./Dropdown";

function Header() {
  return (
    <header
      className="sticky top-0 z-40  dark:bg-[#1D2226]
    flex items-cneter justify-around py-1.5 px-3 focus-within:shadow-lg"
    >
      {/* left */}
      <Link href="/homepage">
        <div className="flex items-center justify-center space-x-3 cursor-pointer ">
          <Image
            src="https://seeklogo.com/images/C/copyright-logo-7E0CDA6BF1-seeklogo.com.png"
            width={55}
            height={55}
          />

          <Dropdown />
        </div>
      </Link>

      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={ChatIcon} text="내게시글" feed linkUrl="/mypost/1" />
        <HeaderLink Icon={ChatIcon} text="쪽지" feed />
        <HeaderLink Icon={NotificationsIcon} text="알림" feed />
        <HeaderLink
          Icon={Avatar}
          text="회원정보"
          feed
          avatar
          linkUrl="/dashboard/1"
        />
        <HeaderLink Icon={Avatar} text="로그아웃" feed avatar />
      </div>
    </header>
  );
}

export default Header;
