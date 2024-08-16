/**
 * 首先找view文件下所有的文件
 * 
 */
//首先找view文件下所有的文件
const pages = import.meta.glob("/src/views/**/page.js",{
  eager: true,
  import: 'default'
});
const pageComps = import.meta.glob('../views/**/index.vue', 
// {
//   eager: true,
//   import: 'default'
// }
)
const routes = Object.entries(pages).map(([path, meta]) => {
  let pageJSPath = path

  path = path.replace('../views', '').replace('/page.js', '')
  path = path || '/'
  const name = path.split('/').filter(Boolean).join('-') || 'index'
  const compPath = pageJSPath.replace('page.js', 'index.vue')
  return {
    path,
    name,
    component: pageComps[compPath],
    meta,
  }
})
console.log(pages)



