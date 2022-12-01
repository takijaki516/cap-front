import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useAuthState } from "../../context/auth";

const RegisterPage = () => {
  const router = useRouter();
  const { userEmail, useEmailFetch } = useAuthState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEmailFetch();

  if (!!userEmail) {
    router.push("/homepage");
  }

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);

    try {
      const res = await Axios.post(
        "http://110.12.218.147:8080/api/v1/user/register",
        {
          email: data.email,
          username: data.username,
          password: data.password,
        }
      );
      console.log(res.data);
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      reset();
    }
  };

  return (
    <div className="h-screen bg-[url('/index_pic.jpg')] bg-[length:500px_500px] opacity-75 ">
      <div className="flex flex-col items-center min-w-fit  sm:pt-0 ">
        <div className="mt-36">
          <Link href="/">
            <h3 className="text-4xl font-bold">회원가입</h3>
          </Link>
        </div>

        <div
          className="w-full px-6 py-4 mt-6 overflow-hidden 
        bg-white shadow-md sm:max-w-md sm:rounded-lg"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-col flex justify-center"
          >
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              이메일
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border-2 border-gray-300 rounded-sm"
            />

            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800 "
            >
              닉네임
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="border-2 border-gray-300 rounded-sm"
            />
            {errors.username && <span>유저네임</span>}

            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 "
            >
              비밀번호
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="border-2 border-gray-300 rounded-sm "
            />
            {errors.password && <span>비밀번호</span>}

            <div className="flex justify-between mt-6">
              <button
                className="p-1 px-2 space-x-2 text- font-bold border-2
                        border-gray-400 w-fit rounded-md
                        cursor-pointer hover:border-blue-300 transition"
                type="submit"
              >
                회원가입 하기
              </button>

              <div
                className="p-1 px-2 space-x-2 text- font-bold border-2
                        border-gray-400 w-fit rounded-md
                        cursor-pointer hover:border-blue-300 transition"
                type="submit"
              >
                <Link href="/">로그인하기</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
