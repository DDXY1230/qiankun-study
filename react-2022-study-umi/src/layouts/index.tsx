import Header from './Header';
import '../base.less'
export default function IndexLayout (props: Object) {
  let { children } = props
  console.log(props)
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  )
}