import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuthState } from "../context/auth";

const HeaderLink = ({ linkUrl, Icon, text, feed, active, hidden }) => {
  const router = useRouter();
  const { setUserEmail } = useAuthState();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    router.push("/");
    setUserEmail("");
  };

  // link 가 없을시
  if (!linkUrl)
    return (
      <div
        className={`cursor-pointer flex flex-col justify-center items-center ${
          feed
            ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={logoutHandler}
      >
        <Icon />

        <h4
          className={`text-sm ${
            feed && "hidden lg:flex justify-center w-full mx-auto"
          }`}
        >
          {text}
        </h4>

        {active && (
          <span
            className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)]
     bg-black dark:bg-white rounded-t-full"
          />
        )}
      </div>
    );

  return (
    <Link href={linkUrl}>
      <div
        className={`cursor-pointer flex flex-col justify-center items-center ${
          feed
            ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <Icon />
        <h4
          className={`text-sm ${
            feed && "hidden lg:flex justify-center w-full mx-auto"
          }`}
        >
          {text}
        </h4>

        {active && (
          <span
            className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)]
         bg-black dark:bg-white rounded-t-full"
          />
        )}
      </div>
    </Link>
  );
};

export default HeaderLink;
