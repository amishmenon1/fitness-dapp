import React, { memo } from "react";

type Props = {
  onChange: (text: string) => void;
};

const Search = ({ onChange }: Props) => {
  console.log("Search rendered!");

  return (
    <input
      type="text"
      placeholder="Search users..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Search);
