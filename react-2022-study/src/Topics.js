import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Topics() {
  const {page, data, loading} = useSelector(state => state.topics)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: "topics/getData",page})
  }, [page])
  return (
    <>
    <hr></hr>
    <h2>文章</h2>
    {
      loading ? <p>数据请求中</p> : data.length > 1 ? (<ul>
        {data.map(item => <li key={item.id}>{item.id}-{item.title}</li>)}
      </ul>) : <p>暂无数据</p>
    }
    <button onClick={() => dispatch({type: "topics/addPage"})}>下一页</button>
    </>
  )
}