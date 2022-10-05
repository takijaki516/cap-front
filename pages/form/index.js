import React from "react";
import Form from "../../components/Form";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const formpage = () => {
  return (
    <div className="bg-[#F3F2EF] h-screen overflow-y-scroll md:space-y-6">
      <Header />

      <main
        className="flex flex-col md:flex-row justify-center
       gap-x-5 px-4 sm:px-12"
      >
        <Sidebar className="grow" />
        <Form />
      </main>
    </div>
  );
};

export default formpage;
