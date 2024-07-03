let objArr = [{name: 19}, {age:10}, {habby: 'aaa'}, {desk: 'bbb'}]
let arr = objArr.filter(i => {
  return i['name']
})
console.log(arr)
let index = 0
for(let i = 0; i < objArr.length; i++) {
  if(objArr[i]['desk']) {
    console.log(i)
    index = i
  }
}