1. 查看浏览器DOMContentLoaded可以知道资源的加载时间
DOMContentLoaded时间具体的采集思路是怎样的呢?
当页面中的HTML元素被加载和解析完成, DOMContentLoaded事件触发

但是不实用在单页面下

那么单页面实用的是Obesermoutation


开启DNS预解析 可以通过在页面中加入dns-prefetch
`
<meta http-equiv="x-dns-prefetch-control" content="on"/>
<link rel="dns-prefetch" href="https://s.google.com/">
`
性能调试工具: lightHouse  灯塔 浏览器自带的,已经集成了

还有一个在线的测试网站: www.webpagetest.org



强制缓存: 
1. Expires: xxx   过期时间 缺点是服务端和客户端的时间有可能不同步,所以有可能不生效   现在用的少了
2. Cache-Control: max-age=5     ( http1.1新增的 )强制缓存5秒后过期重新发起请求  现在主流用的

协商缓存: 
每次使用本地资源的时候向服务器发起请求询问一下服务端
1. Cache-Control: 'no-cache'   no-cache不是没有缓存的意思,是协商缓存的意思
last-modified: ’修改时间‘   服务器告诉客户端资源的更新时间,  客户端发起请求会把if-Modified-Since 发送给服务端,服务端拿着时间去比对,没有变化就返回304,发生变化就返回新的资源内容, 有时候内容并没有变,但是时间修改了,所以用ETag更好.

2. Cache-Control: 'no-cache'
ETag: ‘xxx’  基于内容是否发生改变  基于文件生成一个密码戳, 然后发给客户端 ,  下次浏览器会讲这个值放在if-none-match传给后端,如果这个值端和etag一直,缓存生效.   现在比较推荐ETag
