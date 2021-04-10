[TOC]



# 1 Promise的生命周期

每个Promise都会经历一个短暂的生命周期：先是处于进行中（pending）的状态，此时操作尚未完成，所以它是未处理（unsettled）的；一旦异步操作结束，Promise则变为已处理（settled）的状态，操作结束后，Promise可能进入下面两种已处理状态中的一种：

1. Filfilled 异步操作成功完成。
2. Rejected 由于程序错误或者其他原因，异步操作执行失败。

不能通过编程的方式检测Promise的状态，只有当Promise的状态改变时，通过`then()`方法或者`catch()`方法采取特定的行为。

所有的Promise都有`then()`方法，该方法可接受两个参数：参数一为异步操作成功后的回调函数，参数二为异步操作失败后的回调函数。 同时，所有的Promise也都有`catch()`方法，其参数为异步操作失败后的回调。 在实际开发中，一般习惯于将成功后的回调传给`then()`，将失败后的回调传给`catch()`，来更加清楚明了的处理异步操作结果。



# 2 创建Promise

用Promise构造函数可以创建新的Promise，构造函数只接受一个参数：包含初始化Promise代码的执行器函数。执行器函数接受两个参数，分别是`resolve()`和`rejected()`函数，执行器成功完成时调用`resolve()`函数，失败时调用`rejected()`函数。



## 2.1 创建成功状态的Promise

通过构造函数创建：

```
function getPromise(){

    return new Promise(function (resolve, reject) {
        resolve('异步操作执行成功！')
    })

}

let promise = getPromise();
promise.then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
});

输出结果：
异步操作执行成功！
```



也可以通过`Promise.resolve()`方法来创建成功状态的Promise：

```
let promise = Promise.resolve('异步操作执行成功');
promise.then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
});

输出结果：
异步操作执行成功
```



## 2.2 创建失败状态的Promise

通过构造函数创建：

```
function getPromise(){

    return new Promise(function (resolve, reject) {
        resolve(new Error('异步操作执行失败...'))
    })

}

let promise = getPromise();
promise.then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
});

输出结果：
Error: 异步操作执行失败...
```



也可以通过`Promise.reject()`方法创建：

```
let promise = Promise.reject('异步操作执行失败...');
promise.then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
});

输出结果：
异步操作执行失败...
```



# 3 执行器错误处理

如果执行器内部抛出了一个错误，那么会直接调用Promise的拒绝处理程序：

```
function getPromise(){

    return new Promise(function (resolve, reject) {
        throw new Error('异步操作执行失败...')
    })

}

let promise = getPromise();
promise.then(result => {
    console.log("执行成功回调");
    console.log(result)
}).catch(e => {
    console.log("执行失败回调");
    console.log(e)
});

输出结果：
执行失败回调
Error: 异步操作执行失败...
```

每个执行器中都隐含一个try-catch块，执行器会捕获所有抛出的错误，但只有当拒绝处理程序存在时才会记录执行器中抛出的错误，否则错误将会被忽略。



# 4 Promise串联

每次调用`then()`或者`catch()`方法时实际上创建并返回了另一个Promise，因此可以进行串联操作，只有当第一个Promise完成或被拒绝后，第二个才会被解决：

```
let promise = Promise.resolve('异步操作执行成功');
promise.then(result => {
    console.log("第1个then被调用");
    console.log(result)
}).then(() => {
    console.log("第2个then被调用");
});

输出结果：
第1个then被调用
异步操作执行成功
第2个then被调用
```



`catch()`方法同样可以捕获在`then()`方法中抛出的错误：

```
let promise = Promise.resolve('异步操作执行成功');
promise.then(result => {
    console.log("第1个then被调用");
    console.log(result);
    throw new Error('第1个then抛出错误')
}).then(() => {
    console.log("第2个then被调用");
}).catch(e => {
    console.log('catch被调用');
    console.log(e)
});

输出结果：
第1个then被调用
异步操作执行成功
catch被调用
Error: 第1个then抛出错误
```

**开发建议：务必在Promise链的末尾添加一个拒绝处理程序，以便确保能正确处理所有可能发生的错误。**



# 5 Promise链中传递数据

Promise链的另一个重要特性是可以给下游Promise传递数据：

```
let promise = Promise.resolve(0);
promise.then(result => {
    console.log("第1个then被调用");
    console.log(result);
    return 1;
}).then((result) => {
    console.log("第2个then被调用");
    console.log(result);
    return 2;
}).then((result) => {
    console.log("第3个then被调用");
    console.log(result);
}).catch(e => {
    console.log('catch被调用');
    console.log(e)
});

输出结果：
第1个then被调用
0
第2个then被调用
1
第3个then被调用
2
```



# 6 Promise链中传递Promise

Promise链中亦可以返回Promise给下游：

```
let promise = Promise.resolve(0);
promise.then(result => {
    console.log("第1个then被调用");
    console.log(result);
    return Promise.resolve(1);
}).then((result) => {
    console.log("第2个then被调用");
    console.log(result);
    return Promise.resolve(2);
}).then((result) => {
    console.log("第3个then被调用");
    console.log(result);
}).catch(e => {
    console.log('catch被调用');
    console.log(e)
});

输出结果：
第1个then被调用
0
第2个then被调用
1
第3个then被调用
2
```



当中途某个Promise拒绝时，会直接跳到最后的拒绝处理程序中：

```
let promise = Promise.resolve(0);
promise.then(result => {
    console.log("第1个then被调用");
    console.log(result);
    return Promise.resolve(1);
}).then((result) => {
    console.log("第2个then被调用");
    console.log(result);
    return Promise.reject(2);
}).then((result) => {
    console.log("第3个then被调用");
    console.log(result);
}).catch(e => {
    console.log('catch被调用');
    console.log(e)
});

输出结果：
第1个then被调用
0
第2个then被调用
1
catch被调用
2
```



# 7 响应多个Promise

## 7.1 Promise.all()

该方法只接受一个参数并返回一个Promise，该参数是一个含有多个Promise的可迭代对象。 只有可迭代对象中所有Promise都成功时，返回的Promise才处于成功状态：

```
let promise1 = Promise.resolve(1);
let promise2 = Promise.resolve(2);
let promise3 = Promise.resolve(3);
let promise4 = Promise.reject(4);


Promise.all([promise1,promise2,promise3])
    .then(result => {
        console.log('第一个then被调用');
        console.log(result)
    })
    .catch(e => {
        console.log('第一个catch被调用');
        console.log(e)
    });

Promise.all([promise1,promise2,promise4])
    .then(result => {
        console.log('第二个then被调用');
        console.log(result)
    })
    .catch(e => {
        console.log('第二个catch被调用');
        console.log(e)
    });

输出结果：
第一个then被调用
[ 1, 2, 3 ]
第二个catch被调用
4
```



## 7.2 Promise.race()

该方法同样接受一个包含多个Promise的可迭代对象作为参数，返回一个Promise，但是与`Promise.all()`不同的是，当可迭代对象中的任一Promise执行成功后，不再继续向下执行，直接返回一个成功状态的Promise：

```
let promise1 = Promise.resolve(1);
let promise2 = Promise.resolve(2);
let promise3 = Promise.reject(3);
let promise4 = Promise.reject(4);


Promise.race([promise1,promise2,promise3,promise4])
    .then(result => {
        console.log('then被调用');
        console.log(result)
    })
    .catch(e => {
        console.log('catch被调用');
        console.log(e)
    });

输出结果：
then被调用
1
```



# 8 自Promise继承

Promise与其他内建类型一样，也可以作为基类派生其他类：

```
class MyPromise extends Promise{

    success(resolve,reject){
        return this.then(resolve,reject)
    }

    failure(reject){
        return this.catch(reject)
    }

}

let promise1 = new MyPromise(function (resolve, reject) {
    resolve('111111111')
});

promise1
    .success(res => {
        console.log('promise1 success被调用');
        console.log(res)
    })
    .failure(e => {
        console.log('promise1 failure被调用');
        console.log(e)
    });

let promise2 = new MyPromise(function (resolve, reject) {
    reject('eeeeeeeeee')
});

promise2
    .success(res => {
        console.log('promise2 success被调用');
        console.log(res)
    })
    .failure(e => {
        console.log('promise2 failure被调用');
        console.log(e)
    });

输出结果：
promise1 success被调用
111111111
promise2 failure被调用
eeeeeeeeee
```



用yield调用同步或异步方法都可以正常运行，永远不需要检查返回值是否为Promise。