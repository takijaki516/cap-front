import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

function Form() {
  const [pic, setPic] = useState("");
  const { register, watch, handleSubmit, control } = useForm();
  //업로드 api 기능 구현 해야함
  const uploadPost = async (e) => {};

  const watchImageUpload = watch("file", false);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    console.log(data);
  };

  // 이미지는 어떻게 하지??
  useEffect(() => {
    if (watchImageUpload && watchImageUpload.length > 0) {
      const file = watchImageUpload[0];
      setPic(URL.createObjectURL(file));
    }
    console.log(control);
  }, [watchImageUpload]);

  console.log(watchImageUpload);

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

        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold">카테고리</label>
          <Controller
            name="ReactSelect"
            control={control}
            {...register("cate")}
            render={({ field }) => (
              <Select
                isClearable
                {...field}
                options={[
                  { value: "001", label: "여성" },
                  { value: "002", label: "남성" },
                  { value: "003", label: "기타" },
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
          {pic ? (
            <img src={pic} className="h-14 w-14 bg-slate-500" />
          ) : (
            <div className="h-14 w-14  bg-slate-500" />
          )}
          <label className="text-lg font-bold">이미지</label>
          <input type="file" {...register("file")} />
        </div>

        <div className="flex flex-col w-full space-y-2">
          <label className="text-lg font-bold" htmlFor="price">
            가격
          </label>
          <input
            className="h-8 leading-10 text-lg rounded-md"
            placeholder="1,000"
            {...register("price")}
          />
        </div>

        <button
          className="bg-blue-500 p-2 rounded-lg 
        text-white font-bold hover:cursor-pointer hover:bg-blue-600 transition"
        >
          등록
        </button>
      </form>
    </div>
  );
}

export default Form;
