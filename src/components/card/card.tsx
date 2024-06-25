import classNames from "classnames";

type CardProps = {
  image?: string;
  Button?: string;
  CardDescription?: string;
  CardTitle?: string;
  titleHref?: string;
  btnHref?: string;
  btnText: string;
  btnValue: string;
  disabled?: boolean;
  onBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  gradiantDirection?: string;
};

export const Card = ({
  image,
  btnText,
  btnValue,
  // CardDescription,
  CardTitle,
  disabled = false,
  onBtnClick,
  gradiantDirection = "r",
}: CardProps) => {
  return (
    <>
      <div className="w-full md:w-4/12 min-w-44">
        <div className="p-2">
          <div
            className={classNames(
              `bg-gradient-to-${gradiantDirection}`,
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
              <h3 className="flex justify-center mb-4 font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                {CardTitle}
              </h3>
              <p className="mb-7 text-base leading-relaxed text-white dark:text-dark-6">
                {/* {CardDescription} */}
              </p>

              {btnText && (
                <button
                  value={btnValue}
                  onClick={onBtnClick}
                  className=" rounded-full border border-gray-3 text-body-color transition hover:border-primary hover:bg-gray-600 bg-slate-800 hover:text-white dark:border-dark-3 dark:text-dark-6"
                  disabled={disabled}
                >
                  {btnText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
