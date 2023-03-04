const list = {
  namespace: 'list',
  state: {
    page: 1,
    data: []
  },
  reducers: {
    prevPage(state, action) {
      console.log('prevPage')
      return {
        ...state,
        page: state.page > 1 ? state.page - 1 : state.page
      }
    },
    nextPage(state, action) {
      console.log('nextPage')
      return {
        ...state,
        page:  state.page + 1
      }
    },
    update(state, action) {
      return {
        ...state,
        data: action.data
      }
    }
  },
  effects: {
    *getData({page,tab}, {put,call}) {
      console.log('请求数据')
      let data = yield call(fetch, "https://cnodejs.org/api/v1/topics?limit=10&page="+page + "&tab=" + tab)
      data = yield data.json()
      yield put({
        type: 'update',
        data: data.data
      })
      console.log(data)
 
    }
  }
}
export default list
