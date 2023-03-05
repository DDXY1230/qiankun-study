import React from 'react'
import dva,{connect} from './dva'
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
  },
  effects: {
    *asyncAdd(action,{call, put,select}) {
      yield call(delay,1000)
      yield put({type: 'add'})
      let state = yield select(state => state.counter)
      console.log('state', state)
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
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve,ms)
  })
}