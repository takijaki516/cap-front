import Moment from "react-moment";
import "moment/locale/ko";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useModalState } from "../context/modalContext";
import { useAuthState } from "../context/auth";

const SingleBoard = ({ data }) => {
  const { setModalState } = useModalState();
  const { userEmail, setUserEmail } = useAuthState();
  const router = useRouter();
  const [token, setToken] = useState("");

  const msgBtnHandler = (e) => {
    setModalState(true);
  };

  let imgSrc;
  if (!!data.imageReturnFormList[0]) {
    imgSrc = `data:image/png;base64,${data.imageReturnFormList[0].image}`;
  } else {
    imgSrc = "/no_image.jpg";
  }

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

  // TODO: 지금은 서버에러가 난다. POSTMAN으로도 에러가남, 예전에는 정상작동 했었음
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
      }
    } catch (err) {
      console.log("error from delete", err);
      // setUserEmail("");
      // localStorage.removeItem("auth");
      // router.push("/");
      // return;
    }
  };

  return (
    <div className="flex justify-around mt-10 space-y-4">
      {/* image */}
      <div className="basis-1/3 relative h-[32rem]">
        <Image
          src={imgSrc}
          alt="main product"
          layout="fixed"
          width={512}
          height={512}
        />
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
          <div
            className={`${statusTypeCSS(
              data.status
            )} p-1 px-2 rounded font-bold`}
          >
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
