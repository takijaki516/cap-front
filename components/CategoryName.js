import React from "react";

const CategoryName = ({ cateName, className }) => {
  return (
    <div className={className}>
      <div
        className=" max-w-fit  rounded-md 
      px-4 py-2 font-bold text-5xl"
      >
        {cateName}
      </div>
    </div>
  );
};

export default CategoryName;
