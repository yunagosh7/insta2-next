import React from "react";

const Story = ({ img, username }) => {
  return (
    <div>
      <img className="rounded-full border-red-500 border-2 object-contain h-14 w-14 p-[1.5px] hover:scale-110 transition-transform duration-150 ease-out cursor-pointer" src={img} alt={username}  />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
};

export default Story;
