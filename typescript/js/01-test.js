var a = "hhhhh";
var num = 999; // NaN Infinity
var d = null;
var e = null; // 严格模式下不能为空
var g = null; //非严格模式可以是undefined/null  严格模式是null
var f = null;
var h = undefined;
var i = Symbol("jj");
var error = "111";
var j = []; // [] {} function 这里的object可以是这些类型
var l = { foo: "foo" }; // 这里就只能是字面量类型
var m = { foo: 100, bar: "beautiful" }; // 一一对应
// 数组
var arr1 = [1, 2, 3, 4]; //纯数字组成的数组
var arr2 = [1, 2, 3, 4];
function sum() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return args.reduce(function (prev, current) {
    return prev + current;
  }, 0);
}
// sum(1,'foo')// 报错,
// 元组类型
var tuple = [18, "aaa"];
var age1 = tuple[0];
var age = tuple[0],
  name1_3334 = tuple[1];
var PostStatus;
(function (PostStatus) {
  PostStatus[(PostStatus["draft"] = 0)] = "draft";
  PostStatus[(PostStatus["unpublish"] = 1)] = "unpublish";
  PostStatus[(PostStatus["publish"] = 1)] = "publish";
})(PostStatus || (PostStatus = {}));
var post = {
  title: "是标题",
  content: "typescript study",
  status: PostStatus.draft,
};
