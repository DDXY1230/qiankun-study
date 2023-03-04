import {  useSelector } from 'umi';
import {  Redirect } from 'umi';

export default function({children}) {
   const {user} = useSelector(state => state.user);
   if(user.trim()) {
    return <>{children}</>
   }
    return <Redirect to='/login'></Redirect>
}