import React from 'react'
import dva,{connect} from 'dva'
const app = dva()
app.model({
  namespace: 'counter',
  state: {
    number: 0
  },
  reducers: {
    add(state) {
      return {
        number: state.number + 1
      }
    }
  }
})
function Counter(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={() => props.dispatch({type:'counter/add'})}>+</button>
    </div>
  )
}
const ConnetedCounter = connect(state=>state.counter)(Counter)
app.router(() => <ConnetedCounter/>)
app.start('#root')