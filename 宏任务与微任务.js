console.log("1");

// 宏任务
setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
},1000);
// 微任务
process.nextTick(function () {
  console.log("6");
});

new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  // 微任务
  console.log("8");
});

setTimeout(function () {
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
},0);
// 176


/* 
第一轮循环：
1）、首先打印 1
2）、接下来是setTimeout是异步任务且是宏任务，加入宏任务暂且记为 setTimeout1
3）、接下来是 process 微任务 加入微任务队列 记为 process1
4）、接下来是 new Promise 里面直接 resolve(7) 所以打印 7 后面的then是微任务 记为 then1
5）、setTimeout 宏任务 记为 setTimeout2
第一轮循环打印出的是 1 7
当前宏任务队列：setTimeout1, setTimeout2
当前微任务队列：process1, then1,

第二轮循环：
1）、执行所有微任务
2）、执行process1，打印出 6
3）、执行then1 打印出8
4）、微任务都执行结束了，开始执行第一个宏任务
5）、执行 setTimeout1 也就是 第 3 - 14 行
6）、首先打印出 2
7）、遇到 process 微任务 记为 process2
8）、new Promise中resolve 打印出 4
9）、then 微任务 记为 then2
第二轮循环结束，当前打印出来的是 1 7 6 8 2 4
当前宏任务队列：setTimeout2
当前微任务队列：process2, then2

第三轮循环：
1）、执行所有的微任务
2）、执行 process2 打印出 3
3）、执行 then2 打印出 5
4）、执行第一个宏任务，也就是执行 setTimeout2 对应代码中的 25 - 36 行
5）、首先打印出 9
6）、process 微任务 记为 process3
7）、new Promise执行resolve 打印出 11
8）、then 微任务 记为 then3
第三轮循环结束，当前打印顺序为：1 7 6 8 2 4 3 5 9 11
当前宏任务队列为空
当前微任务队列：process3，then3

第四轮循环：
1）、执行所有的微任务
2）、执行process3 打印出 10
3）、执行then3 打印出 12
代码执行结束：
最终打印顺序为：1 7 6 8 2 4 3 5 9 11 10 12
*/