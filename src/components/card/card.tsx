type CardProps = {
  image?: string;
  Button?: string;
  CardDescription?: string;
  CardTitle?: string;
  titleHref?: string;
  btnHref?: string;
  onBtnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  // btnHref,
  onBtnClick,
}: CardProps) => {
  return (
    <>
      {/*  */}
      <div className="w-72 h-full overflow-hidden rounded-lg bg-gray-600 shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-white dark:text-dark-6">
            {CardDescription}
          </p>

          {Button && (
            <button
              onClick={onBtnClick}
              className=" inline-block rounded-full border border-gray-3 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-gray-600 bg-slate-800 hover:text-white dark:border-dark-3 dark:text-dark-6"
            >
              {Button}
            </button>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default Card;
