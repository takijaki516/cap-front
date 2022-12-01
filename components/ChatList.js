import React from "react";

const ChatList = ({ children, pageTitle }) => {
  return (
    <div className="py-10 h-screen bg-[#F3F2EF]  px-2">
      <h1 className="text-center text-xl">
        {pageTitle === "sent" ? "보낸 쪽지함" : "받은 쪽지함"}
      </h1>
      <div className="w-3/5 mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="w-full p-4">
            <ul>{children}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
