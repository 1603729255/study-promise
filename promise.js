function Promise(executor) {
  //初始化属性
  this.PromiseState = "pending";
  this.PromiseResult = null;
  // 声明属性 保存回调函数
  this.callbacks = [];
  const self = this;
  function resolve(data) {
    // console.log(this); //指向window
    // 判断状态
    if (self.PromiseState !== "pending") return;
    // 1. 修改状态promiseState
    self.PromiseState = "fulfilled";
    // 2. 修改对象结果promiseResult
    self.PromiseResult = data;
    // 调用成功的回调函数
    self.callbacks.forEach((item) => {
      item.onResolved(data);
    });
  }

  function reject(data) {
    // 判断状态
    if (self.PromiseState !== "pending") return;
    // 1. 修改状态promiseState
    self.PromiseState = "rejected";
    // 2. 修改对象结果promiseResult
    self.PromiseResult = data;
    // 调用失败的回调函数
    self.callbacks.forEach((item) => {
      item.onRejected(data);
    });
  }
  // 同步调用执行器函数
  try {
    executor(resolve, reject); //new Promise(()=>{})中回调函数
  } catch (error) {
    // 3. 抛出异常
    // 修改
    reject(error);
  }
}
// 添加then
Promise.prototype.then = function (onResolved, onRejected) {
  return new Promise((resolve, reject) => {
    // 调用回调函数
    // console.log(this.PromiseState, "pending异步的");
    if (this.PromiseState === "pending") {
      // 保存回调函数
      this.callbacks.push({
        onResolved:function(){
          console.log(1);
        },
        onRejected:function () {
          console.log(2);
        },
      });
    }

    if (this.PromiseState === "fulfilled") {
      try {
        let result = onResolved(this.PromiseResult);
        if (result instanceof Promise) {
          // promise对象
          result.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          //非promise对象
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    }

    if (this.PromiseState === "rejected") {
      try {
        let result = onRejected(this.PromiseResult);
        if (result instanceof Promise) {
          // promise对象
          result.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          //非promise对象
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    }
  });
};
