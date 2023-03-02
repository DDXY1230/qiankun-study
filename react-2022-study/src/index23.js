import React  from "react";
import ReactDOM from "react-dom";
/**
 * 自定义hooks
 * 一个函数以use开头 并且里面调用了别的hooks 那么就是自定义hooks
 * @param {*} url 
 */
function useRequest(url) {
  let limit = 5;
  let [offset, setOffset] = React.useState(0);
  let [data, setData] = React.useState([])
  function loadMore () {
    setData(null)// 下面是异步代码,闭包,所以这里置为null不会影响下面的data
    fetch(`${url}?offset=${offset}&limit=${limit}`).then(
      res => {
        console.log('res',res)
        return res.json()
      }
    ).then(pageData => {
      console.log('pageData',pageData)
      const list = pageData.codeText.userList
      setData([...data, ...list])// 这里的data并不是null
      setOffset(offset + list.length)
    })
  }
  // 第一次渲染的时候,先调用一次loadMore,加载第一页
  React.useEffect(loadMore, [])
  return [data,loadMore]
}
function App() {
  const [users,loaderMemo] = useRequest('http://127.0.0.1:8888/api/users')
  if(users === null) {
    return <div>加载中.....</div>
  }
  return (
    <div>
      {
        users.map((user,index) => <li key={user.id}>{user.id} - {user.name}</li>)
      }
      <button>加载更多</button>
    </div>
  )

}
ReactDOM.render(<App/>,document.getElementById('root'))