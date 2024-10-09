// Promise all
const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 1000);
  });
};

const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 2000);
  });
};

const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3);
      resolve(3);
    }, 3000);
  });
};

const promise4 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(4);
      resolve(4);
    }, 4000);
  });
};
const promiseArr = [promise1, promise2, promise3, promise4];

const promiseAll = (pList) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    const pLength = pList.length;
    const result = [];
    for (let i = 0; i < pLength; i++) {
      pList[i]()
        .then((res) => {
          count++;
          result[i] = res;
          if (pLength === count) {
            console.log(result, "result");
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
promiseAll(promiseArr);

// race
Promise.race = function (promise) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promise.length; i++) {
      promise[i].then(resolve, reject);
    }
  });
};

// retry
function retry(fn, maxTries) {
  return new Promise((resolve, reject) => {
    function attempt(tryNumber) {
      console.log("重试次数", tryNumber);
      fn()
        .then(resolve)
        .catch((error) => {
          if (tryNumber < maxTries) {
            attempt(tryNumber + 1);
          } else {
            reject(error);
          }
        });
    }
    attempt(1);
  });
}
function downloadFile() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("test");
    }, 1000);
  });
}

retry(() => downloadFile(), 3)
  .then((data) => console.log("文件下载成功"))
  .catch((err) => console.log("文件下载失败"));

// plimit
const promise11 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 1000);
  });
};
const promise22 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve(2);
    }, 1000);
  });
};
const promise33 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3);
      resolve(3);
    }, 1000);
  });
};
const promise44 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(4);
      resolve(4);
    }, 1000);
  });
};
const promiseArr2 = [promise11, promise22, promise33, promise44];
// 控制并发
const pLimit = (pList, limit) => {
  return new Promise((resolve, reject) => {
    let runCount = 0;
    let resolveCount = 0;
    const pListLength = pList.length;
    const result = [];
    const nextP = (p, count) => {
      p().then((res) => {
        result[count] = res;
        resolveCount++;
        if (pList.length) {
          const pNext = pList.shift();
          nextP(pNext, runCount);
          runCount++;
        } else if (resolveCount === pListLength) {
          resolve(result);
        }
      });
    };
    while (runCount < limit && pList.length) {
      const p = pList.shift();
      nextP(p, runCount);
      runCount++;
    }
  });
};
pLimit(promiseArr2, 3).then((res) => {
  console.log(res, "111222333");
});
