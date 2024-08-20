let file = document.getElementById('file')
file.onchange = function(event) {
  let fileHandle = event.target.files[0]
  let reader = new FileReader()
  // reader.readAsText(fileHandle)
  reader.readAsDataURL(fileHandle)
  reader.onload = function(event) {
    console.log(event.target.result)
  }
}