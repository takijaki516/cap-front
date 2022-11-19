import Moment from "react-moment";
import "moment/locale/ko";

import { useModalState } from "../context/modalContext";

const SingleBoard = ({ data }) => {
  const { modalState, setModalState } = useModalState();

  const msgBtnHandler = (e) => {
    setModalState((prev) => !prev);
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

        <div className="flex justify-end space-x-8 mx-4 mt-1 mb-2 ">
          <div>
            <span className="text-sm font-medium text-gray-600">상태: </span>
            {data.status}
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
          <div
            className="bg-sky-400 hover:bg-sky-500 text-white font-bold transition
          rounded-md px-10  py-3 cursor-pointer"
            onClick={msgBtnHandler}
          >
            쪽지보내기
          </div>
          {/* 여기서 삭제 버튼은 자기 자신 게시물 일때만 보여주기 */}
          <div
            className="bg-red-500 hover:bg-red-600 text-white font-bold transition
          rounded-md px-10  py-3 cursor-pointer"
          >
            삭제
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBoard;
