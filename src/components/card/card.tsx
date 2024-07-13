import classNames from "classnames";
import { useAccount } from "wagmi";

type CardProps = {
  image?: string;
  button?: string;
  cardDescription?: string;
  cardTitle?: string;
  titleHref?: string;
  btnHref?: string;
  btnText?: string;
  btnValue?: string;
  disabled?: boolean;
  onBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  gradiantDirection?: string;
  btnComponent?: React.ReactNode;
};

export const Card = ({
  image,
  btnText,
  btnValue,
  btnComponent,
  // CardDescription,
  cardTitle,
  disabled = false,
  onBtnClick,
  gradiantDirection = "r",
}: CardProps) => {
  const { isConnected } = useAccount();
  return (
    <>
      <div
        className={classNames(
          !btnComponent ? " md:w-4/12 min-w-44" : "",
          "w-full"
        )}
      >
        <div className="p-4">
          <div
            className={classNames(
              gradiantDirection === "r"
                ? `bg-gradient-to-r`
                : `bg-gradient-to-l`,
              "rounded-lg from-black to-gray-400 "
            )}
          >
            <div className="flex items-center justify-center">
              <img
                id="card-img"
                src={image}
                alt=""
                className="w-full rounded-t-lg"
              />
            </div>
            <div className="p-6 text-center sm:p-9 md:p-7 xl:p-9 flex flex-col justify-center">
              <h3 className="flex justify-center mb-4 font-semibold text-white hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                {cardTitle}
              </h3>
              <p className="mb-7 text-base leading-relaxed text-white">
                {/* {CardDescription} */}
              </p>

              {btnText && (
                <div className={!isConnected ? `has-tooltip` : ""}>
                  <span
                    className={
                      disabled
                        ? ` text-black tooltip rounded shadow-lg p-1 bg-gray-100 text-neutral-600 -mt-10`
                        : "hidden"
                    }
                  >
                    Connect Wallet to Vote!
                  </span>
                  <button
                    value={btnValue}
                    onClick={onBtnClick}
                    className={classNames(
                      "",
                      " hover:bg-black hover:text-white text-xs xs:text-sm  text-gray-900 font-bold bg-gray-400 px-4 xs:w-1/2 xs:min-w-1/2 rounded-full transition"
                    )}
                    disabled={disabled}
                  >
                    {btnText}
                  </button>
                </div>
              )}
              {btnComponent && (
                <div className="flex justify-center">{btnComponent}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
