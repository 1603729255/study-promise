/*
  let p1 = new Promise((resolve, reject) => {
    // 1 resolve函数
    // resolve("OK");
    //2 reject 函数
    // reject("error");
    //3 抛出错误
    throw "出问题了";
  });

  console.log(p1);
 */

/* // p2指定多个回调 在状态改变时都会执行。状态不改变 都不执行
  let p2=new Promise((resolve, reject) => {
    resolve('ok')
  })

  p2.then(value=>{
    console.log(1,value);
  })
  p2.then(value=>{
    console.log(2,value);
  }) 
*/

/* 
  resolve("ok2");先改变状态再指定并执行回调
  resolve("ok1");由于在异步的setTimeout中,会先执行then指定回调,等到resolve执行再执行函数
  then会放入微任务队列中
*/
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(1);
    resolve("ok1");
  }, 2000);
  // resolve("ok2");
});

p3.then(
  (value) => {
    console.log(value);
  },
  (reason) => {}
);
