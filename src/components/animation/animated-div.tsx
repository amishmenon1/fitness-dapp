import { Transition } from "@headlessui/react";
import classNames from "classnames";

type AnimatedDivProps = {
  children?: React.ReactNode;
  show?: boolean;
  className?: string;
};
export function AnimatedDiv({ children, show, className }: AnimatedDivProps) {
  return (
    <div className={classNames(`mt-8 flex flex-col items-center`, className)}>
      <Transition
        show={show}
        enter="transition ease-out duration-200 rotate-[-120deg]"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100 rotate-[0deg]"
        leave="transition ease-in duration-75 rotate-[0deg]"
        leaveFrom="transform opacity-100 scale-100 "
        leaveTo="transform opacity-0 scale-95 "
      >
        {children}
      </Transition>
    </div>
  );
}
