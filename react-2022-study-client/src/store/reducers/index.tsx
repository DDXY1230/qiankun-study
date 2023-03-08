import { connectRouter } from "connected-react-router";
import { combineReducers, ReducersMapObject, Reducer } from "redux";
import history from "../history";

import HomeState,{home} from "./home";
import mine,{MineState} from "./mine";
import profile,{ProfileState} from "./profile";

const reducers: ReducersMapObject = {
  router: connectRouter(history),
  home,
  mine,
  profile,
};
type RootState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>;
};
const rootReducer: Reducer<RootState> = combineReducers<RootState>(reducers);
console.log(HomeState)
export { 
  RootState,
  HomeState,
  MineState,
  ProfileState
 };
export default rootReducer;
