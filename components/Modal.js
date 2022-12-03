import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

import { useModalState } from "../context/modalContext";
import { useAuthState } from "../context/auth";

// 상세 item에서 들어오면 board가 true
// chatlist에서 들어오면 messageItem이 true
const Modal = ({ board, messageItem }) => {
  const [token, setToken] = useState("");
  const { modalState, setModalState } = useModalState();
  const { register, handleSubmit, reset } = useForm();
  const { setUserEmail } = useAuthState();

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

  const onSubmit = async (data, e) => {
    let reqBody;
    if (!!messageItem) {
      // 답장할때
      reqBody = {
        title: "RE] " + messageItem.title,
        content: data.text,
        receiver: messageItem.sender,
        boardtitle: messageItem.title,
      };
    } else {
      //처음 보낼때
      reqBody = {
        title: board.title + " 문의",
        content: data.text,
        receiver: board.email,
        boardtitle: board.title,
      };
    }

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

      if (res.data.result === "success") {
        reset();
      }
    } catch (err) {
      setModalState(false);
      setUserEmail("");
      localStorage.removeItem("auth");
      router.push("/");
      return;
    } finally {
      reset();
      setModalState(false);
    }
  };

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
                  {/* 쪽지제목 구현 */}
                  <div className="flex items-center self-end">
                    <input
                      className="ml-2 inline-block min-w-fit outline-none 
                    bg-slate-50 p-2 text-xl placeholder-black"
                      placeholder={
                        !!board
                          ? board.title + " 문의"
                          : "RE] " + messageItem.title
                      }
                      disabled
                    />
                  </div>
                </div>
                {/*body*/}
                <div className="relative px-6 py-4 bg-slate-50">
                  <textarea
                    className="h-52 w-full  outline-none bg-slate-50"
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
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
