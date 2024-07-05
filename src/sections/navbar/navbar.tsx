/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthButton from "@/components/connect-wallet";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import ProfileDropdown from "./profile-dropdown";
import MobileMenu from "./mobile-menu";
import DesktopMenu from "./desktop-menu";
import MobileMenuButton from "./mobile-menu-button";
import { useAccount } from "wagmi";
import { NavItemType, mainPaths } from "@/routes/paths";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const [current, setCurrent] = useState<NavItemType>();
  const { isConnected, address } = useAccount();
  function onNavItemClick(item: NavItemType) {
    setCurrent(item);
  }

  return (
    current && (
      <Disclosure
        id="nav-disclosure1"
        as="nav"
        className="bg-gray-800 bg-opacity-50 fixed w-full z-50"
      >
        {({ open }) => (
          <>
            <div id="nav-container1" className="xs:px-10 sm:px-20">
              <div
                id="nav-container2"
                className="relative flex h-16 items-center justify-between"
              >
                <div
                  id="mobile-nav-container"
                  className="absolute inset-y-0 left-0 flex items-center sm:hidden"
                >
                  {/* Mobile menu button*/}
                  <MobileMenuButton open={open} />
                </div>
                <div id="top-left-nav-container" className="flex flex-1">
                  {/* logo */}
                  <div className="flex flex-shrink-0">
                    {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                  </div>
                  {/* Desktop nav options  */}
                  <DesktopMenu
                    navigationOptions={mainPaths}
                    onClick={onNavItemClick}
                    classNames={classNames}
                    current={current}
                  />
                </div>
                {/* Connect & Profile */}
                <div
                  id="top-right-nav-container"
                  className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                >
                  <p className=" pr-4 hidden xs:block">
                    {isConnected
                      ? `${address?.slice(0, 4)}...${address?.slice(-3)}`
                      : ""}
                  </p>
                  <AuthButton />

                  {/* Profile dropdown */}
                  <ProfileDropdown classNames={classNames} />
                </div>
              </div>
            </div>
            <MobileMenu
              navigationOptions={mainPaths}
              classNames={classNames}
              onClick={onNavItemClick}
              current={current}
            />

            {/* <MobileSidebar className=" min-w-48" /> */}
          </>
        )}
      </Disclosure>
    )
  );
};

export default NavBar;
