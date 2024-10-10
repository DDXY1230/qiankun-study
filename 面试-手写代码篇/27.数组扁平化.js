function flat(arr, num = 1) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && num > 0) {
      result = result.concat(flat(item, num - 1));
    } else {
      result.push(item);
    }
  });
  return result;
}
