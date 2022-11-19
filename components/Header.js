import Image from "next/image";
import ChatIcon from "@mui/icons-material/Chat";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

import HeaderLink from "./HeaderLink";
import Dropdown from "./Dropdown";

function Header() {
  return (
    <header
      className="sticky top-0 z-40  dark:bg-[#1D2226]
    flex items-cneter justify-around  px-3 focus-within:shadow-lg"
    >
      {/* left */}
      <div className="flex justify-center items-center space-x-10 p-2">
        <Link href="/homepage">
          <div
            className="flex items-center rounded-full overflow-hidden
          justify-center space-x-3 cursor-pointer border-4 border-gray-300"
          >
            <Image src="/index_pic.jpg" width={55} height={55} layout="fixed" />
          </div>
        </Link>
        <Dropdown />
      </div>

      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink
          Icon={ChatIcon}
          text="내게시글"
          feed
          linkUrl="/user/post/2"
        />
        <HeaderLink
          Icon={MailOutlineIcon}
          text="쪽지함"
          feed
          linkUrl="/dashboard/"
        />
        {/* <HeaderLink
          Icon={Avatar}
          text="회원정보"
          feed
          avatar
          linkUrl="/dashboard/"
        /> */}
        <HeaderLink Icon={LogoutIcon} text="로그아웃" feed avatar />
      </div>
    </header>
  );
}

export default Header;
