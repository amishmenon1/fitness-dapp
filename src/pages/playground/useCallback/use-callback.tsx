import React, { useCallback, useState } from "react";
import Search from "./search";

const allUsers = ["John", "Jane", "Alice", "Bob"];
const CallbackExample = () => {
  const [users, setUsers] = useState(allUsers);

  const handleSearch = useCallback(
    (text: string) => {
      console.log("users[0]: ", users[0]);
      const filteredUsers = allUsers.filter((user) =>
        user.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filteredUsers);
    },
    [users]
  );

  return (
    <div>
      <div className="flex">
        <button
          onClick={() => {
            setUsers((prev) => [...prev].sort(() => Math.random() - 0.5));
          }}
        >
          Shuffle
        </button>
        <Search onChange={handleSearch} />
      </div>

      <div>
        <ul>
          {users.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CallbackExample;
