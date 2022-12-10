const message = "Error: foo is not define";
console.log(
  // message.startsWith('Error') // true
  // message.endsWith('.') // false
  message.includes("foo") // true
);
