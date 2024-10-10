function converter(obj) {
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = key.replace(/_([a-z])/g, function (match, p1) {
        console.log(match, p1);
        return p1.toUpperCase();
      });
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
}
console.log(converter({ a_dfdf_hhh: "a_dfdf_hhh" }));
