// eslint-disable-next-line import/no-anonymous-default-export
export default (count = 1, action) => {
  switch (action.type) {
    case "count/add":
      console.log('count/add' ,count)
      return count + 1;
    default:
      return count;
  }
};
