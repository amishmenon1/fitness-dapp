/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavItemType } from "./navbar";

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
            <a
              key={item.name}
              href={item.href}
              onClick={() => onClick(item)}
              className={classNames(
                current?.name == item.name
                  ? "font-bold text-white"
                  : "text-gray-300  hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={current?.name == item.name ? "page" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesktopMenu;
