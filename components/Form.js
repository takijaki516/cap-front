import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Axios from "axios";
import { useRouter } from "next/router";

import { useAuthState } from "../context/auth";

function Form() {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [token, setToken] = useState("");

  const { setUserEmail, userEmail, useEmailFetch } = useAuthState();

  useEmailFetch();

  // token 확인
  useEffect(() => {
    const storageData = localStorage.getItem("auth");
    if (!!storageData) {
      const tokenData = JSON.parse(storageData).data;
      setToken(tokenData);
    } else {
      setToken("");
    }
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.board_image.length === 0) {
      formData.append("category_id", data.cate.value);
      formData.append("title", data.title);
      formData.append("text", data.text);
      formData.append("price", data.price);
    } else {
      formData.append("imageList", data.board_image[0]);
      formData.append("category_id", data.cate.value);
      formData.append("title", data.title);
      formData.append("text", data.text);
      formData.append("price", data.price);
    }

    try {
      const res = await Axios.post(
        "http://110.12.218.147:8080/api/v1/board/add",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: token,
            // "Content-Type": "application/json",
          },
        }
      );

      if (res.data.result === "success") {
        reset();

        window.alert("성공");
        router.push("/homepage");
      } else {
        window.alert("다시 로그인 해주세요");

        setUserEmail("");
        localStorage.removeItem("auth");
        router.push("/");
        return;
      }
    } catch (err) {
      setUserEmail("");
      localStorage.removeItem("auth");
      router.push("/");

      return;
    } finally {
      reset();
    }
  };

  if (!userEmail) {
    return (
      <Link href="/">
        <div>로그인 해주세요</div>
      </Link>
    );
  }

  return (
    <div className="w-10/12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4"
      >
        {/* 제목 */}
        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold" htmlFor="title">
            제목
          </label>
          <input
            className="h-10 leading-10 text-lg rounded-md"
            placeholder="제목"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-600">제목을 입력해주세요</span>
          )}
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold">카테고리</label>

          <Controller
            name="cate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                isClearable
                isSearchable={false}
                {...field}
                options={[
                  { value: "0101", label: "여성의류" },
                  { value: "0102", label: "남성의류" },
                  { value: "0103", label: "신발" },
                  { value: "0104", label: "가방" },
                  { value: "0105", label: "쥬얼리" },
                  { value: "0106", label: "시계" },
                  { value: "0201", label: "노트북&PC" },
                  { value: "0202", label: "PC주변장치" },
                  { value: "0301", label: "장남감" },
                  { value: "0302", label: "아동의류" },
                  { value: "0401", label: "조명" },
                  { value: "0402", label: "악기" },
                  { value: "0403", label: "문구" },
                ]}
              />
            )}
          />
          {errors.cate && (
            <span className="text-red-600">카테고리를 선택해주세요</span>
          )}
        </div>

        {/* 본문 */}
        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold" htmlFor="title">
            본문
          </label>
          <textarea
            className="h-72 leading-10 text-lg rounded-md"
            placeholder="본문"
            {...register("text", { required: true })}
          />
          {errors.text && (
            <span className="text-red-600">본문을 입력해주세요</span>
          )}
        </div>

        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold">이미지</label>
          <input
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            {...register("board_image")}
          />
        </div>

        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold" htmlFor="price">
            가격
          </label>
          <input
            className="h-8 leading-10 text-lg rounded-md"
            type="number"
            placeholder="원 단위"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-600">가격을 입력해주세요</span>
          )}
        </div>

        <button
          className="bg-blue-500 p-2 rounded-lg 
        text-white font-bold hover:cursor-pointer hover:bg-blue-600 transition"
          type="submit"
        >
          등록
        </button>
      </form>
    </div>
  );
}

export default Form;
