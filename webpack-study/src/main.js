import "./main.css";

import footer from "./footer.html";
import someMd from "./some.md";
import img1 from "./xiaojinmao.jpg";
import img2 from "./2.png";
const img = new Image();
img.src = img2;
document.body.append(img);

const img_1 = new Image();
img_1.src = img1;
document.body.append(img_1);
function count(a, b) {
  return () => {
    console.log("123321");
  };
}
document.write(footer);
console.log("markdown文件输出", someMd);

// if(module.hot) { // webpack.config.js中配置了new webpack.HotModuleReplacementPlugin()
// module.hot.accept('./heading.js', () => {
// console.log('js热更新')
// })
// }

console.log("this is a main file");
console.log("this is a main file2");
console.log("this is a main file");
console.log("this is a main file");
console.log("this is a main file");
console.log("this is a main file");
console.log("this is a main file");
console.log("this is a main file");
console.log("this is a main file");
