import React, {PropsWithChildren} from "react";
import { connect } from "react-redux";
import {RouteChildrenProps} from 'react-router-dom'
import { RootState,MineState } from "../../store/reducers";
import './index.less'
type Prop = PropsWithChildren<RouteChildrenProps> & RootState
function Mine(props: Prop) {
  return <div>{props.title}</div>
}
function mapStateToProps(state: RootState): RootState {
  return state.mine
}
export default connect(mapStateToProps)(Mine);
