let nunjucks = require("nunjucks");
nunjucks.configure({ autoescape: true });
let result = nunjucks.renderString(
  `
  <ul>
  {% for user in user %}
  <li data-id={{user.id}}>{{loop.index0}}{{user.name}}</li>
  {% endfor %}
  </ul>
`, { user:[{id:1,name: '小明'}, {id:2,name: '小红'}] });
  // <li data-id={{user.id}}>  {{loop.index0}}  {{user.name}}</li>
  // index0 说明要求索引从0开始
  // index1 说明要求索引从1开始
console.log(result)
