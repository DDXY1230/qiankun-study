import { AnyAction } from "redux";

export interface HomeState {
  title: string;
}
const initialState: HomeState = { title: "首页" };
function reducer(state: HomeState, action: AnyAction): HomeState {
  switch (action.type) {
    default:
      return state;
  }
}
export default reducer;
