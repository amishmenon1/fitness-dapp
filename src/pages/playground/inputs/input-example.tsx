import { useEffect, useRef, useState } from "react";

const InputExample = () => {
  // const [name, setName] = useState<string | null>(null); // controlled input
  const inputRef = useRef(null);
  const idRef = useRef(1);

  const [names, setNames] = useState<any[]>([
    { id: idRef.current++, name: "John" },
    { id: idRef.current++, name: "Jane" },
  ]);
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);
  const addName = () => {
    // if (!name) return;
    // setNames((prev) => [...prev, name]);
    // setName(null);

    setNames([
      ...names,
      //@ts-ignore
      { id: idRef.current++, name: inputRef.current?.value },
    ]);
    //@ts-ignore
    inputRef.current.value = "";
  };
  return (
    <div>
      <h2>Enter Name to Add</h2>
      <input
        type="text"
        // value={name || ""}
        // onChange={(e) => setName(e.target.value)}
        ref={inputRef}
      />
      {/* <button disabled={name === null} onClick={() => addName()}> */}
      <button onClick={addName}>Add</button>
      <ul>
        {names.map((n, idx) => {
          return (
            <li key={n.id}>
              ID: {n.id} - Name: {n.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InputExample;
