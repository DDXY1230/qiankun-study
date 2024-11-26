// fetch传参数

const url = "https://example.com/api/user";
const data = new URLSearchParams();
data.append("username", "john");

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: data,
});
