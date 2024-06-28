/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavItemType } from "@/routes/paths";
import { DisclosureButton, DisclosurePanel } from "@headlessui/react";

type MobileMenuProps = {
  navigationOptions: any[];
  classNames: (...args: string[]) => string;
  onClick: (item: any) => void;
  current: NavItemType;
};

const MobileMenu = ({
  navigationOptions,
  classNames,
  onClick,
  current,
}: MobileMenuProps) => {
  return (
    <>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 bg-black bg-opacity-70">
          {navigationOptions.map((item: any) => (
            // <div className="bg-black">
            <DisclosureButton
              key={item.key}
              as="a"
              href={item.path}
              onClick={() => onClick(item)}
              className={classNames(
                current?.key == item.key
                  ? "text-green-500  hover:text-green-300 font-bold"
                  : "text-gray-300 hover:bg-green-500 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              aria-current={current?.label == item.label ? "page" : undefined}
            >
              {item.label}
            </DisclosureButton>
            // </div>
          ))}
        </div>
      </DisclosurePanel>
    </>
  );
};

export default MobileMenu;
