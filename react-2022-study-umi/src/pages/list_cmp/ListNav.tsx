import { Menu } from 'antd';
import { Link } from 'umi';
import listTypes from '@/assets/listTab';
export default function () {
  return (
    <Menu selectedKeys={['0']} mode="horizontal">
      {listTypes.map((item) => (
        <Menu.Item key={item.type}>
          <Link to={`/list/${item.type}`}>{item.title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}
