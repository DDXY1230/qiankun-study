import {Layout} from 'antd'
import { Link } from 'umi'
export default function Header(props:Object) {
  console.log(props)
  // return <Layout.Header>头部</Layout.Header>
  return <header id='header'>
    <nav>
      <Link to='/'>首页</Link><span> | </span>
      <Link to='/about'>关于</Link><span> | </span>
      <Link to='/list'>列表</Link><span> | </span>
      <Link to='/login'>登录</Link><span> | </span>
    </nav>
  </header>
}