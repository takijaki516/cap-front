import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Axios from "axios";
import { useRouter } from "next/router";

function Form() {
  const router = useRouter();
  const { register, watch, handleSubmit, control, reset } = useForm();
  const [token, setToken] = useState("");

  const [pic, setPic] = useState("");

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

  const formData = new FormData();

  const onImgChange = (e) => {
    const imgSrc = e.target.files[0];
    formData.append("imageList", imgSrc);
  };

  const onSubmit = async (data) => {
    // const reqBody = {
    //   category_id: data.cate.value,
    //   title: data.title,
    //   text: data.text,
    //   price: data.price,
    // };

    formData.append("category_id", data.cate.value);
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("price", data.price);

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

      console.log(res);

      if (res.data.result === "success") {
        reset();
        router.push("/homepage");
      } else {
        alert("다시 로그인 해주세요");
      }
    } catch (err) {
      console.log(err);
    } finally {
      reset();
    }
  };

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
            {...register("title")}
          />
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold">카테고리</label>

          <Controller
            name="cate"
            control={control}
            // {...register("cate")}
            render={({ field }) => (
              <Select
                isClearable
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
        </div>

        {/* 본문 */}
        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold" htmlFor="title">
            본문
          </label>
          <textarea
            className="h-72 leading-10 text-lg rounded-md"
            placeholder="본문"
            {...register("text")}
          />
        </div>

        {/* image 업로드  */}
        <div className="flex flex-col w-full space-y-2">
          {/* 업로드된 image */}
          {/* {pic ? (
            <img src={pic} className="h-14 w-14 bg-slate-500" />
          ) : (
            <div className="h-14 w-14  bg-slate-500" />
          )} */}
          <label className="text-lg font-bold">이미지</label>
          {/* 이미지 포맷형식? */}
          <input
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            name="board_image"
            onChange={onImgChange}
          />
        </div>

        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold" htmlFor="price">
            가격
          </label>
          <input
            className="h-8 leading-10 text-lg rounded-md"
            placeholder="원 단위"
            {...register("price")}
          />
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
