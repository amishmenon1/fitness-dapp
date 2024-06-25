type StatusProps = {
  message?: string;
};

const StatusSection = ({ message = "" }: StatusProps) => {
  return (
    <div className="text-white text-sm w-full  bg-black bg-opacity-50">
      {message}
    </div>
  );
};

export default StatusSection;
