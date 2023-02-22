(function () {
  'use strict';

  // 元组
  // tuple[3] = 100 // 不能通过索引更改元组
  // 枚举类型
  var Role;
  (function (Role) {
      Role[Role["USER"] = 0] = "USER";
      Role[Role["ADMIN"] = 1] = "ADMIN";
      Role["MANAGER"] = "manager";
  })(Role || (Role = {}));
  console.log(Role.USER); // 0
  console.log(Role[1]); //ADMIN 枚举支持反举, 但是仅限于索引
  console.log(Role.ADMIN);
  console.log(Role.MANAGER);
  console.log(Role); // 打印出来是一个对象
  //object 
  var max = Number.MAX_SAFE_INTEGER;
  console.log(BigInt(max) + BigInt(1) === BigInt(max) + BigInt(2)); // false
  var ele = document.getElementById('app');
  ele.innerHTML = 'abc'; // 非空断言

})();
//# sourceMappingURL=bundle.js.map
