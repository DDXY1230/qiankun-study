import { createStore ,combineReducers, applyMiddleware} from 'redux'
import count from './reducers/count'
import topics from './reducers/topics'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers({
  count,
  topics
}), applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store