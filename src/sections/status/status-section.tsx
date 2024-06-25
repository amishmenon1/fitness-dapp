type StatusProps = {
  message?: string;
};

const StatusSection = ({ message = "Status" }: StatusProps) => {
  return (
    <div className="text-white text-sm w-full bg-neutral-900 py-2 ">
      {message}
    </div>
  );
};

export default StatusSection;
