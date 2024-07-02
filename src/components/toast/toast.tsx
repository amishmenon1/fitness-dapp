import classNames from "classnames";
import { useState } from "react";

type Props = {
  message: string;
  type: "info" | "error" | "success" | "warning";
};

export const Toast = ({ message, type = "info" }: Props) => {
  const [visible, setVisible] = useState(true);
  const [color, _] = useState(() => {
    switch (type) {
      case "info":
        return "bg-info-500";
      case "error":
        return "bg-error-500";
      case "success":
        return "bg-success-500";
      case "warning":
        return "bg-warning-500";
      default:
        return "bg-info-500";
    }
  });

  return (
    <div className={`${!visible ? "hidden" : ""}`}>
      <div
        className={classNames(
          color,
          `absolute top-20 right-0 w-80 text-sm text-white rounded-md shadow-lg dark:bg-gray-900 mb-3 ml-3`
        )}
        role="alert"
        id="toast"
      >
        <div className="flex p-4">
          {message}
          <div className="ms-auto">
            <button
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white"
              onClick={() => setVisible(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
