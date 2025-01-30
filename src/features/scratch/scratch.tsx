import { Button } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../../app/store/store"
import { decrement, increment, incrementByAmount } from "./testSlice";

export default function () {
    const {data} = useAppSelector(state => state.test)

    const dispatch = useAppDispatch();

  return (
    <div>
        <h1>Scratch Page</h1>
        <h3>The data is: {data}</h3>
        <Button onClick={() => dispatch(increment())} color="green" content='increment'/>
        <Button onClick={() => dispatch(decrement())} color="red" content='decrement'/>
        <Button onClick={() => dispatch(incrementByAmount(5))} color="teal" content='increment by 5'/>
    </div>
  )
}
