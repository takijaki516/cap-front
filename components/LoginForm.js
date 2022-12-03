import Link from "next/link";

const LoginForm = () => {
  return (
    <div
      className="relative flex flex-col justify-center
     overflow-hidden border items-center top-96 max-w-lg mx-auto bg-red-400"
    >
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          로그인 (샘플 화면)
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              이메일
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              비밀번호
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">
            비밀번호 찾기
          </a>

          <div className="mt-6">
            <Link href="/homepage">
              <button className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                로그인!!!!! 원래는 로그인 해야 함!(그냥 홈페이지로 가기)
              </button>
            </Link>
          </div>
        </form>

        {/* 그냥 구분선임 */}
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          아직 회원이 아닌가요?
          <Link href="/register">
            <a href="#" className="font-medium text-purple-600 hover:underline">
              회원가입
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
