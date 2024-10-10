const getAllStr = (str) => {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.substring(i, j));
    }
  }
  return result;
};
console.log(getAllStr("ABCD"));
