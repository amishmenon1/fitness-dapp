// type Props = {}
import React from "react";
import { cn } from "@/utils/utils";
import { useEffect } from "react";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const AuthLayout = ({ className }: Props) => {
  const { isConnected } = useAccount();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (isConnected) navigate("/");
  }, [isConnected, navigate]);
  return (
    <div
      className={cn(
        `py-3 flex h-screen w-screen overflow-hidden justify-center`,
        className
      )}
    >
      {/* <NavBar /> */}

      <div className="py-16 xs:px-10 sm:px-20 md:px-40 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
