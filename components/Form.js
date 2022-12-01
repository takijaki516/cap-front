import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Axios from "axios";
import { useRouter } from "next/router";

function Form() {
  const router = useRouter();
  const { register, watch, handleSubmit, control, reset } = useForm();
  const [pic, setPic] = useState("");

  const [token, setToken] = useState("");
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
    const reqBody = {
      category_id: data.cate.value,
      title: data.title,
      text: data.text,
      price: data.price,
    };

    console.log(reqBody);

    try {
      const res = await Axios.post(
        "http://110.12.218.147:8080/api/v1/board/add",
        reqBody,
        {
          withCredentials: true,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
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

  // 이미지는 어떻게 하지??
  // useEffect(() => {
  //   if (watchImageUpload && watchImageUpload.length > 0) {
  //     const file = watchImageUpload[0];
  //     setPic(URL.createObjectURL(file));
  //   }
  // }, [watchImageUpload]);
  // console.log("useEffect 밖에 있는 image 관련", watchImageUpload);

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
                  { value: "0001", label: "여성의류" },
                  { value: "0002", label: "남성의류" },
                  { value: "0003", label: "신발" },
                  { value: "0004", label: "가방" },
                  { value: "0005", label: "쥬얼리" },
                  { value: "0006", label: "시계" },
                  { value: "0007", label: "노트북&PC" },
                  { value: "0008", label: "PC주변장치" },
                  { value: "0009", label: "장남감" },
                  { value: "0010", label: "아동의류" },
                  { value: "0011", label: "조명" },
                  { value: "0012", label: "악기" },
                  { value: "0013", label: "문구" },
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
        {/* <div className="flex flex-col w-full space-y-2">
          {pic ? (
            <img src={pic} className="h-14 w-14 bg-slate-500" />
          ) : (
            <div className="h-14 w-14  bg-slate-500" />
          )}
          <label className="text-lg font-bold">이미지</label>
          <input type="file" {...register("file")} />
        </div> */}

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
