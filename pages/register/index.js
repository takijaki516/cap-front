import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import baseApi from "../../util/baseApi";

const index = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [match, setMatch] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    baseApi.post("/user", {
      email,
      nickname,
      password,
    });

    router.push("/");
  };

  useEffect(() => {
    if (
      password.length !== 0 &&
      checkPassword.length !== 0 &&
      password === checkPassword
    ) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [password, checkPassword]);

  console.log(match);

  return (
    <div className="relative top-44">
      <div
        className="flex flex-col items-center min-h-screen pt-6 sm:justify-center 
    sm:pt-0 "
      >
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </a>
        </div>

        <div
          className="w-full px-6 py-4 mt-6 overflow-hidden 
        bg-white shadow-md sm:max-w-md sm:rounded-lg"
        >
          <form onSubmit={submitHandler}>
            <div className="my-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                이메일
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full mt-1  border-2 border-slate-100 hover:border-slate-400 
                focus:outline-none rounded-md text-lg "
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                닉네임
              </label>
              <input
                type="text"
                name="name"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="block w-full mt-1 border-2 border-slate-100 hover:border-slate-400 
                focus:outline-none rounded-md text-lg"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full mt-1 border-2  rounded-md text-lg ${
                  match
                    ? "border-slate-100 hover:border-slate-400 focus:outline-none"
                    : "border-red-500 hover:border-red-500 focus:outline-none "
                }`}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                비밀번호 재입력
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                className={`block w-full mt-1 border-2  rounded-md text-lg ${
                  match
                    ? "border-slate-100 hover:border-slate-400 focus:outline-none"
                    : "border-red-500 hover:border-red-500 focus:outline-none "
                }`}
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="#"
              >
                이미 회원?
              </a>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2 ml-4 
                text-xs font-semibold  text-white rounded-md bg-gray-900"
                disabled={!match}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
