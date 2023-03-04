import listTypes from '@/assets/listTab';
import { useParams, Redirect } from 'umi';
export default function ({ children }) {
  const { tab = 'all' } = useParams();
  const is = listTypes.some((item) => {
    return item.type === tab;
  });
  console.log(is);
  if (is) {
    return <div>{children}</div>;
  }else {
    return <Redirect to='/404'></Redirect>
  }
}
