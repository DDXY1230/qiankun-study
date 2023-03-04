import { useDispatch, useParams, useSelector } from "umi";
import ListNav from "./list_cmp/ListNav";
import { List,Button } from 'antd'
import { useEffect } from "react";

export default function ListPage() {
  const {list, loading} = useSelector(state => state)
  const {page,data} = list
  const {tab='all'} = useParams()
  const dispatch = useDispatch()
  console.log(loading)
  useEffect(() => {
    dispatch({
      type: 'list/getData',
      tab,
      page
    })
  }, [page, tab])
  return (
    <div className="wrap">
      <h1 className="title">List</h1>
     <ListNav></ListNav>
     <List
     loading={loading.models.list}
     bordered={true}
     dataSource={list.data}
     renderItem={item=>{
      return <List.Item>{item.title}</List.Item>
     }}
     ></List>
     <Button onClick={()=>{
      dispatch({
        type: 'list/prevPage'
      })
     }}>prev</Button>
     <strong>{page}</strong>
     <Button onClick={()=>{
      dispatch({
        type: 'list/nextPage'
      })
     }}>next</Button>
    </div>
  )
}