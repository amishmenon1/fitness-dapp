import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from "./state/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment By 5
      </button>
      <button onClick={() => dispatch(incrementAsync(5))}>
        Increment By 5 Async
      </button>
    </>
  );
};
const Redux = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

export default Redux;
