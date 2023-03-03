import {takeEvery,put,call} from "redux-saga/effects"


function * watchToTopics() {
  yield takeEvery('topics/getData', workToTopics)
}
function * workToTopics(action, sagas) {
  console.log(action,sagas)
  yield put({
    type: "topics/loading"
  })
  let data = yield call(fetch, "https://cnodejs.org/api/v1/topics?limit=10&page="+action.page)
  data = yield data.json()
  console.log(data)
  yield put({
    type: 'topics/update',
    data: data.data
  })

}
export default watchToTopics