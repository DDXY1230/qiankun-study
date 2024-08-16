const inp = document.querySelector('input')
const preview = document.querySelector('preview')
inp.onchange = function() {
  const file = inp.files[0]
  const reader = new FileReader()
  reader.onload = e => {
    preview.src = e.target.result // 把结果放到预览区域
    
  }
  reader.readAsDataURL(file);

}