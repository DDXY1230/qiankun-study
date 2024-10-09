const mySetTimeOut = (fn, delay, ...args) => {
  const start = Date.now();
  // 最简单的办法,但是比较消耗性能,而且阻塞js运行
  // while (true) {
  //   const now = Date.now();
  //   if (now - start >= delay) {
  //     fn.apply(this.args);
  //     return;
  //   }
  // }

  let timer, now;
  const loop = () => {
    timer = requestAnimationFrame(loop);
    now = Date.now();
    if (now - start >= delay) {
      fn.apply(this, args);
      cancelAnimationFrame(timer);
    }
  };
  requestAnimationFrame(loop);
};

function test() {
  console.log(1);
}
mySetTimeOut(test, 1000);
