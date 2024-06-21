type StatusProps = {
  message: string;
};

const StatusSection = ({ message }: StatusProps) => {
  return <div className="text-white text-lg">{message}</div>;
};

export default StatusSection;
