import { useModalState } from "../context/modalContext";
import Modal from "./Modal";

const ChatListItem = ({ item, showReplyBtn }) => {
  const { setModalState } = useModalState();

  console.log("item", item);

  const msgBtnHandler = (e) => {
    setModalState(true);
  };

  return (
    <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded  transition my-10 ">
      <div className="flex flex-col w-full ml-1 mt-1 space-y-2">
        <div className="flex space-x-4">
          <span className="flex flex-col">
            <span>
              <span className="text-lg font-semibold ">상품명:</span>
              <span className="ml-2 text-lg font-semibold ">
                {item.board_title}
              </span>
            </span>
            <span>
              <span className="text-lg font-semibold ">제목:</span>
              <span className="ml-2 text-lg font-semibold text-slate-500">
                {item.title}
              </span>
            </span>

            {showReplyBtn && (
              <span>
                <span className="text-lg font-semibold ">보낸사람 :</span>
                <span className="ml-2 text-lg font-semibold text-slate-500">
                  {item.sender}
                </span>
              </span>
            )}

            {!showReplyBtn && (
              <span>
                <span className="text-lg font-semibold ">받은사람 :</span>
                <span className="ml-2 text-lg font-semibold text-slate-500">
                  {item.receiver}
                </span>
              </span>
            )}
          </span>
        </div>

        <hr />
        <div className="flex pt-1 ml-4">
          <span>
            <span className="font-semibold text-black">{item.content}</span>
          </span>
        </div>
      </div>
      {showReplyBtn && (
        <div className="ml-28 min-w-fit p-2 mr-4 bg-gray-500 rounded hover:bg-gray-600 ">
          <span
            onClick={msgBtnHandler}
            className="text-white font-bold cursor-pointer"
          >
            답장하기
          </span>
          <Modal board={null} messageItem={item} />
        </div>
      )}
    </li>
  );
};

export default ChatListItem;
