import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
function RiderDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex w-[100%] h-[100vh]">
        <div
          className={`bg-gray-900 sm:w-[30%] md:w-[27%] lg:w-[25%] fixed sm:relative h-full z-50 sm:block transition-transform duration-300 ${
            isSidebarOpen
              ? "translate-x-0 w-[40%]"
              : "-translate-x-full sm:translate-x-0"
          }`}
        >
          <div
            className="w-[20px] h-[20px] ml-auto relative right-[5px] top-[5px] block sm:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <img src="/images/whitecorss.png" />
          </div>
          <div className="text-white relative   text-center font-semibold sm:text-[20px] top-[60px] md:text-[25px]  lg:text-[35px]">
            Food Delivery
          </div>
          <div className="flex flex-col top-[100px]  relative">
            <Link
              to="/riderprofile"
              className="text-center text-white lg:text-[20px] pt-[8px] pb-[8px] border-t-1 border-gray-200 hover:bg-neutral-400 duration-400"
            >
              My Profile
            </Link>
            <Link
              to=""
              className="text-center text-white lg:text-[20px] pt-[8px] pb-[8px] border-t-1 border-gray-200 hover:bg-neutral-400 duration-400"
            >
              Available Sessions
            </Link>
            <Link
              to=""
              className="text-center text-white lg:text-[20px] pt-[8px] pb-[8px] border-t-1 border-gray-200 hover:bg-neutral-400 duration-400"
            >
              My Sessions
            </Link>
            <Link
              to=""
              className="text-center text-white lg:text-[20px] pt-[8px] pb-[8px] border-t-1 border-gray-200 hover:bg-neutral-400 duration-400"
            >
              Inbox
            </Link>
            <Link className="text-center text-white lg:text-[20px] pt-[8px] pb-[8px] border-t-1 border-gray-200 hover:bg-neutral-400 duration-400">
              Order History
            </Link>
            <Link className="text-center text-white  lg:text-[20px] pt-[8px] pb-[8px] border-t-1 border-gray-200 hover:bg-neutral-400 duration-400">
              Wallet
            </Link>
            <Link className="text-center text-white lg:text-[20px] pt-[8px] pb-[8px] border-t-1  border-gray-200 bg-amber-500">
              Payment
            </Link>
          </div>
        </div>
        <div className="w-[100%] sm:w-[70%] md:w-[73%] lg:w-[75%]">
          <div className="flex items-center  justify-center sm:justify-start h-[70px] shadow-md">
            <div
              className="flex flex-col gap-[5px] relative right-[90px] block sm:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <div className="border-2 w-[23px] "></div>
              <div className="border-2 w-[23px]"></div>
              <div className="border-2 w-[23px]"></div>
            </div>
            <div className="relative sm:left-[15px] lg:left-[30px] font-semibold text-[20px] sm:text-[20px] md:text-[25px] lg:text-[30px]">
              Rider Dashboard
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RiderDashboard;
