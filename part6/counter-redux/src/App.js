import { useSelector, useDispatch } from "react-redux"
import { decrement, increment, zero } from "./index"

const App = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>plus</button>
      <button onClick={() => dispatch(decrement())}>minus</button>
      <button onClick={() => dispatch(zero())}>zero</button>
    </div>
  )
}

export default App
