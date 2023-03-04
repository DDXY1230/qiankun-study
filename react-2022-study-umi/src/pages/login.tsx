import { useDispatch, useSelector } from 'umi';

export default function () {
  const {user} = useSelector((state) => {
    return state.user
});
console.log(user)
  const dispatch = useDispatch();

  return (
    <div className="wrap">
      <h3>登录</h3>
      {!user ? (
        <button
          onClick={() => {
            dispatch({
              type: 'user/login',
            });
          }}
        >登录</button>
      ) : (
        <button
          onClick={() => {
            dispatch({
              type: 'user/logout',
            });
          }}
        >退出</button>
      )}
    </div>
  );
}
