/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavItemType } from "@/routes/paths";
import { Link } from "react-router-dom";

type DesktopMenuProps = {
  navigationOptions: any[];
  classNames: (...args: string[]) => string;
  onClick: (item: any) => void;
  current: NavItemType;
};

const DesktopMenu = ({
  navigationOptions,
  classNames,
  onClick,
  current,
}: DesktopMenuProps) => {
  return (
    <>
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4">
          {navigationOptions.map((item: NavItemType) => (
            <Link
              key={item.key}
              onClick={() => onClick(item)}
              className={classNames(
                current?.key === item.key
                  ? "text-green-400  hover:text-blue-gray-200 font-extrabold"
                  : "text-gray-300  hover:text-white",
                "rounded-md px-3 py-2 text-md font-medium cursor-pointer hover:cursor-pointer"
              )}
              aria-current={current?.label == item.label ? "page" : undefined}
              to={item.path}
            >
              {/* <span>{item.icon}</span> */}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesktopMenu;
