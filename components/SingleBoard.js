import Moment from "react-moment";
import "moment/locale/ko";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useModalState } from "../context/modalContext";
import { useAuthState } from "../context/auth";

const SingleBoard = ({ data }) => {
  const { setModalState } = useModalState();
  const { userEmail } = useAuthState();
  const router = useRouter();
  const [token, setToken] = useState("");

  const msgBtnHandler = (e) => {
    setModalState(true);
  };

  const statusTypeText = (type) => {
    if (type === "0") {
      return "렌탈가능";
    }
    if (type === "1") {
      return "사용중";
    }
    if (type === "2") {
      return "완료";
    }
  };
  const statusTypeCSS = (type) => {
    if (type === "0") {
      return "statusGreen";
    }
    if (type === "1") {
      return "statusYellow";
    }
    if (type === "2") {
      return "statusOrange";
    }
  };
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

  const url = `http://110.12.218.147:8080/api/v1/board/delete?board_id=${data.board_id}`;

  // TODO: token 에러 처리하기 (그냥 axios에서 처리 하는게 더 좋을꺼 같다.)
  const deleteBtnHandler = async (data) => {
    try {
      const res = await Axios.post(
        url,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.result === "success") {
        router.push("/homepage");
      } else {
        alert("다시 로그인 해주세요");
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log("success");
    }
  };

  return (
    <div className="flex justify-around mt-10 space-y-4">
      {/* image */}
      <div className="basis-1/3">
        {/* TODO: image logic */}
        <img src="/no_image.jpg" />
      </div>

      {/* left */}
      <div className="flex flex-col basis-1/2">
        <div className="border-b border-gray-300">
          <div className="font-bold text-4xl">{data.title}</div>
          <div className="font-bold text-3xl flex items-center mt-4 pb-4">
            {data.price} 원
          </div>
        </div>

        <div className="flex justify-end space-x-8 mx-4 my-1 items-center ">
          <div className={`${statusTypeCSS(data.status)} p-1 rounded`}>
            <span className="text-sm font-medium text-gray-600">상태: </span>
            {statusTypeText(data.status)}
          </div>
          <div className="text-gray-600">
            <Moment fromNow ago>
              {data.created_at}
            </Moment>
            {"   전"}
          </div>
        </div>
        {/* 작성자는 숨길까?? */}

        <div className="bg-opacity-30  pt-5 h-3/5 bg-neutral-200 p-2 rounded-sm">
          {data.text}
        </div>

        <div className="mt-6 flex justify-around">
          {/* 여기서 삭제 버튼은 자기 자신 게시물 일때만 보여주기 */}
          {data.email === userEmail ? (
            <div
              className="bg-red-500 hover:bg-red-600 text-white font-bold transition
          rounded-md px-10  py-3 cursor-pointer"
              onClick={deleteBtnHandler}
            >
              삭제
            </div>
          ) : (
            <div
              className="bg-sky-400 hover:bg-sky-500 text-white font-bold transition
          rounded-md px-10  py-3 cursor-pointer"
              onClick={msgBtnHandler}
            >
              쪽지보내기
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBoard;
