/**
 * 
 * @param {*} text 
 * 
 * 一旦判断了浏览器支持那种复制方式,后面就直接使用不需要每次都判断
 * 这是一个小小的开发技巧
 */


function copyText(text) {
  if(navigator.clipboard) {
    copyText = (text) => {
      navigator.clipboard.writeText(text)
    }
  }else {
    copyText = (text) => {
      const input = document.createElement('input');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy);
      document.body.removeChild(input);
    }
  }
}