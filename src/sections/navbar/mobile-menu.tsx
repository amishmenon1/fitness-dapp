/* eslint-disable @typescript-eslint/no-explicit-any */
import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { NavItemType } from "./navbar";

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
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigationOptions.map((item: any) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={() => onClick(item)}
              className={classNames(
                current?.name == item.name
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              aria-current={current?.name == item.name ? "page" : undefined}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </>
  );
};

export default MobileMenu;
