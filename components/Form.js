import { useState } from "react";

function Form() {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  //업로드 api 기능 구현 해야함
  const uploadPost = async (e) => {};

  return (
    <form
      className="flex flex-col relative space-y-2 text-black/80 w-full
       bg-slate-200 min-h-fit"
    >
      <textarea
        rows="4"
        placeholder="등록"
        className="bg-transparent focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input
        type="text"
        placeholder="사진 업로드"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm
         "
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />

      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500
         disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed 
         text-white rounded-full px-3.5 py-1"
        type="submit"
        onClick={uploadPost}
        disabled={!input.trim() && !photoUrl.trim()}
      >
        등록
      </button>
    </form>
  );
}

export default Form;
