import Thumb from "./Thumb";

const Card = ({ imgUrl, title, boardStatus }) => {
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

  return (
    <div className="h-80">
      <div className="relative h-full">
        <span
          className={`bg-red absolute z-40 px-2 py-1 top-2 left-2 font-semibold leading-tight ${statusTypeCSS(
            boardStatus
          )}`}
        >
          {statusTypeText(boardStatus)}
        </span>
        <Thumb imgUrl={imgUrl} />
        <div className="absolute w-full bottom-0 px-4 py-2 rounded-b-xl bg-zinc-800">
          <h2 className="text-cyan-200 text-center truncate">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
