import React, { useMemo, useState } from "react";

const intialItems = new Array(29_999_999).fill(0).map((_, i) => {
  return {
    id: i,
    isSelected: i === 29_999_998,
  };
});

const MemoExample = () => {
  console.log("rendered");
  const [count, setCount] = useState(0);
  const [items] = useState(intialItems); // initialItems is only run once when component is initialized

  // const selectedItem = useMemo(() => items.find((i) => i.isSelected), [items]);
  const selectedItem = useMemo(
    () => items.find((i) => i.id === count),
    [items, count]
  );

  return (
    <div>
      <h1>Count: {count}</h1>
      <h1>Selected item: {selectedItem?.id}</h1>
      {/* this will cause count to change and the whole component to re-render */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MemoExample;
