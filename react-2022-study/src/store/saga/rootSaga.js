import {all} from 'redux-saga/effects'
import watchToTopics from './topicsSaga'
function * rootSaga() {
  yield all([watchToTopics()])
}
export default rootSaga