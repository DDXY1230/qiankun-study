let name = "Alice",
  day = "Monday";
const str = `hello, ${name},today is ${day}`;
const arrar = console.log`hello, ${name},today is ${day}`; // [ 'hello, ', ',today is ', '' ] Alice Monday
function myTagFunc(string, ...args) {
  console.log(string); //[ 'hello, ', ',today is ', '' ]
  console.log(args); // [ 'Alice', 'Monday' ]
}
const array = myTagFunc`hello, ${name},today is ${day}!`;
