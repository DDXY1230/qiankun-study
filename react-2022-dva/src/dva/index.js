import ReactDOM from "react-dom/client";
import { Provider,connect } from 'react-redux'
import {createStore,combineReducers} from 'redux'
import prefixNamespace from './prefixNamespace'
export {connect}
function dva() {
  const app = {
    _models: [],
    _router: [],
    model,
    router,
    start,
  };
  let initialReducers = {}
  function model(model) {
    let prefixedModel = prefixNamespace(model)
    app._models.push(prefixedModel);
    return prefixedModel
  }
  function router(router) {
    app._router.push(router);
  }

  function start(container) {
    for(let model of app._models) {
      initialReducers[model.namespace] = getReducer(model)
    }
    let rootReducer = createReducer()
    let store = createStore(rootReducer)
    function createReducer () {
      return combineReducers(initialReducers)
    }
    const root = ReactDOM.createRoot(document.querySelector(container));
    root.render(<Provider store={store}>{app.router()}</Provider>);

  }
  return app;
}
function getReducer(model) {
  let {state: initialReducers, reducers} = model
  let reducer = (state=initialReducers, action) => {
    let reducer = reducers[action.type]
    if(reducer) return reducer(state)
    return state
  }
  return reducer
}
export default dva;
