/**
 * 某银行将客户分为若干等级,1级最高, 5级最低,当你需要在银行办理业务时
 * 优先级高的人随时可以插队到优先级低的人的前面
 * 现在给出一个人员到来和银行办理业务的时间序列,请你在每次银行办理业务时输出客户编号
 * 如果同时有多位优先级相同且最高的客户,则按照先来后到的顺序办理
 * 
 */

/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 1) {
    n = lines[0] - 0;
  }

  if (n && lines.length === n + 1) {
    lines.shift();
    const seq = lines.map((line) => line.split(" "));
    getResult(n, seq);
    lines.length = 0;
  }
});

function getResult(n, seq) {
  const pq = new PriorityQueue((a, b) =>
    a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]
  );

  for (let i = 0; i < n; i++) {
    const tmp = seq[i];

    switch (tmp[0]) {
      case "a":
        const num = Number(tmp[1]);
        const x = Number(tmp[2]);
        pq.offer([x, i, num]);
        break;
      case "p":
        const cust = pq.poll();
        if (cust) console.log(cust[2]);
        else console.log("");
    }
  }
}

// 基于堆实现优先队列
class PriorityQueue {
  constructor(cpr) {
    this.queue = [];
    this.cpr = cpr;
  }

  swap(a, b) {
    const tmp = this.queue[a];
    this.queue[a] = this.queue[b];
    this.queue[b] = tmp;
  }

  // 上浮
  swim() {
    let c = this.queue.length - 1;

    while (c >= 1) {
      const f = Math.floor((c - 1) / 2);

      if (this.cpr(this.queue[c], this.queue[f]) < 0) {
        this.swap(c, f);
        c = f;
      } else {
        break;
      }
    }
  }

  // 入队
  offer(val) {
    this.queue.push(val);
    this.swim();
  }

  // 下沉
  sink() {
    let f = 0;

    while (true) {
      let c1 = 2 * f + 1;
      let c2 = c1 + 1;

      let c;
      let val1 = this.queue[c1];
      let val2 = this.queue[c2];
      if (val1 && val2) {
        c = this.cpr(val1, val2) < 0 ? c1 : c2;
      } else if (val1 && !val2) {
        c = c1;
      } else if (!val1 && val2) {
        c = c2;
      } else {
        break;
      }

      if (this.cpr(this.queue[c], this.queue[f]) < 0) {
        this.swap(c, f);
        f = c;
      } else {
        break;
      }
    }
  }

  // 出队
  poll() {
    this.swap(0, this.queue.length - 1);
    const res = this.queue.pop();
    this.sink();
    return res;
  }

  peek() {
    return this.queue[0];
  }

  size() {
    return this.queue.length;
  }
}

