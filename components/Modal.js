import { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useRouter } from "next/router";

import { useModalState } from "../context/modalContext";

const Modal = ({ boardOwner, token }) => {
  const { modalState, setModalState } = useModalState();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  console.log(boardOwner.image);

  const onSubmit = async (data, e) => {
    const reqBody = {
      title: data.title,
      content: data.price,
      receiver: boardOwner.email,
    };

    try {
      const res = await Axios.post(
        "http://110.12.218.147:8080/api/v1/message",
        reqBody,
        {
          withCredentials: true,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("asdfasdf", res.data);

      if (res.data.result === "success") {
        reset();
      } else {
        alert("다시 로그인 해주세요");
      }
    } catch (err) {
      console.log(err);
    } finally {
      reset();
      setModalState(false);
    }
  };

  console.log(boardOwner);

  return (
    <>
      {modalState ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/5 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">쪽지 보내기</h3>
                  <div className="flex items-center self-end">
                    <input
                      className="ml-2 inline-block placeholder-blue-700 w-48 outline-none 
                    bg-slate-50 p-2 text-xl"
                      placeholder="제목"
                      {...register("title")}
                    />
                  </div>
                </div>
                {/*body*/}
                <div className="relative px-6 py-4 bg-slate-50">
                  <textarea
                    className="h-52 w-full placeholder-blue-700 outline-none bg-slate-50"
                    placeholder="본문"
                    {...register("text")}
                  ></textarea>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold  px-6 py-2 text-sm 
                    outline-none focus:outline-none mr-1 mb-1 transition-all duration-150"
                    type="button"
                    onClick={() => setModalState(false)}
                  >
                    닫기
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow 
                    hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                  >
                    보내기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
