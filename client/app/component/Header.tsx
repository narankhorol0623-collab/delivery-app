import { CircleUserRound, Soup } from "lucide-react";
import React from "react";
const Header = () => {
  return (
    <div className="bg-sky-950 md:h-20 h-10 md:w-full flex justify-evenly items-center">
      <div className="flex gap-2 items-center">
        <Soup className="h-20 w-20 text-red-500" />
        <div className="flex flex-col items-end">
          <div className="flex gap-x-2 items-center">
            <p className="md:text-3xl text-xl">FoodTopia</p>
            <p className="md:text-3xl text-red-400 animate-pulse">delivery</p>
          </div>
          <p>fast food heaven</p>
        </div>
      </div>
      <div className="flex gap-5">
        <button className="md:h-10 md:w-30 flex items-center gap-1.5 justify-center bg-white text-black border rounded-2xl cursor-pointer hover:bg-gray-600 hover:text-white hover:animate-bounce">
          <CircleUserRound className="h-6 w-6" />
          Sign Up
        </button>
        <button className="md:h-10 md:w-50 text-white bg-gray-600 border rounded-2xl cursor-pointer hover:bg-white hover:text-black hover:animate-bounce">
          Login Existing Account
        </button>
      </div>
    </div>
  );
};

export default Header;
