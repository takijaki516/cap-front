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
      className="sticky top-0 z-50  dark:bg-[#1D2226]
    flex items-cneter justify-around  px-3 focus-within:shadow-lg"
    >
      {/* left */}
      <div className="flex justify-center items-center space-x-10 p-2">
        {/* icon */}
        <Link href="/homepage">
          <div
            className="flex items-center rounded-full overflow-hidden
          justify-center space-x-3 cursor-pointer border-4 border-gray-300"
          >
            <Image
              src="/index_pic.jpg"
              width={55}
              height={55}
              layout="fixed"
              alt="index"
            />
          </div>
        </Link>

        {/* dropdown */}
        <Dropdown />
      </div>

      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={ChatIcon} text="내게시글" feed linkUrl="/user/post" />
        <HeaderLink
          Icon={MailOutlineIcon}
          text="보낸 쪽지함"
          feed
          linkUrl="/user/message/sent"
        />
        <HeaderLink
          Icon={MailOutlineIcon}
          text="받은 쪽지함"
          feed
          linkUrl="/user/message/receive"
        />
        <HeaderLink Icon={LogoutIcon} text="로그아웃" feed />
      </div>
    </header>
  );
}

export default Header;
