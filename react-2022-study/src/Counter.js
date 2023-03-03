import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  console.log(count)
  return (
    <div>
      <h2> 计数器 </h2>
      <div>
        <span>{count}</span> <button onClick={() => {dispatch({type: 'count/add'})}}> 递增 </button>
      </div>
    </div>
  );
};
