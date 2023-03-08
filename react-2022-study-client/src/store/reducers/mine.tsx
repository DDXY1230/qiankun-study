import { AnyAction } from "redux";

export interface MineState {
  title: string;
}

const initialState: MineState = { title: "购物车" };
function reducer(state: MineState, action: AnyAction): MineState {
  switch (action.type) {
    default:
      return state;
  }
}
export default reducer;
