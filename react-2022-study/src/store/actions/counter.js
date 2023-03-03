import * as types from '../action-types'
import { push } from 'connected-react-router'
const actions = {
  add() {
    return {type: types.ADD}
  },
  minus() {

  },
  go(targetPath){
    return push(targetPath)
  }
}
export default actions