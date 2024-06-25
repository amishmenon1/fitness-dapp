import NavBar from "@/sections/navbar/navbar";
import { cn } from "@/utils/utils";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const MainLayout = ({ className }: Props) => {
  return (
    <div
      className={cn(`py-3 flex h-screen w-screen overflow-hidden`, className)}
    >
      {/* <h3 className="text-black">Main Layout</h3> */}

      <NavBar />

      <div className="py-16 xs:px-10 sm:px-20 md:px-40 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
