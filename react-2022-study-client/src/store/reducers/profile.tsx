import { AnyAction } from "redux";

export interface ProfileState {
  title: string;
}

const initialState: ProfileState = { title: "购物车" };
function reducer(state: ProfileState, action: AnyAction): ProfileState {
  switch (action.type) {
    default:
      return state;
  }
}
export default reducer;
