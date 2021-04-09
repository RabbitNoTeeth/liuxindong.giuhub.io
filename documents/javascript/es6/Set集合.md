[TOC]

ES6中新增的Set类型是一种**有序**列表，其中含有一些相互独立的**非重复**值，通过Set集合可以快速访问其中的数据，更有效地追踪各种离散值。



# 1 Set

## 1.1 创建并添加元素

```
let set = new Set();
set.add(5);
set.add('5');

console.log(set);
console.log(set.size);
输出结果：
Set { 5, '5' }
2
```



在Set集合中，不会对所存值进行强制的类型转换（引擎内部使用`Object.is()`方法检测两个值是否一致，唯一的例外是，Set集合中的 +0 和 -0 被认为是相等的）。

Set构造函数可以接受所有可迭代对象作为参数，数组、Set集合、Map集合都是可迭代的，因此都可以作为Set构造函数的参数使用；构造函数通过迭代器从参数中提取值。



## 1.2 检查元素是否存在

```
let set = new Set();
set.add(5);

console.log(set.has(5));
console.log(set.has(6));
输出结果：
true
false
```



## 1.3 移除元素

```
let set = new Set();
set.add(5);
set.add(6);

console.log(set.has(5));
set.delete(5);  //移除指定元素
console.log(set.has(5));
set.clear();    //清空Set集合
console.log(set.has(6));
输出结果：
true
false
false
```



## 1.4 遍历Set集合

ES6为Set集合添加了`forEach()`方法来简化集合的遍历过程，该方法的回调函数接受三个参数：下一个元素、与第一个参数一样的值、被遍历的Set集合本身。

```
let set = new Set();
set.add(5);
set.add(6);

set.forEach((value,key,self) => {
    console.log(value);
    console.log(key);
    console.log(self);
});
输出结果：
5
5
Set { 5, 6 }
6
6
Set { 5, 6 }
```

不能像访问数组元素那样直接通过索引访问Set集合中的元素，如有需要，最好先将Set集合转换成一个数组。



## 1.5 将Set集合转换为数组

```
let set = new Set();
set.add(5);
set.add(6);

let arr = [...set];

console.log(arr);
输出结果：
[ 5, 6 ]
```



# 2 WeakSet

Set类型可以看做是一个强引用的Set集合，只要Set实例中的引用存在，垃圾回收机制就不能释放该对象的内存空间。

```
let set = new Set();
let key = 'aaa';

set.add(key);
console.log(set);

key = null;     //移除key的原始引用
console.log(set);

key = [...set][0];  //重新取回原始引用

console.log(key);
输出结果：
Set { 'aaa' }
Set { 'aaa' }
aaa
```

可以看到，在清除key的原始引用后，Set集合内仍然保留有key的原始引用。

为了解决这个问题，ES6中引入了Weak Set集合（弱引用Set集合）。 Weak Set集合只存储对象的弱引用，并且不可以存储原始值；集合中的弱引用如果是对象唯一的引用，则会被回收并释放响应内存。



**创建WeakSet**

用WeakSet构造函数可以创建Weak Set集合，集合只支持3个方法：add、has、delete

```
let weakSet = new WeakSet();
let key = {};

weakSet.add(key);
console.log(weakSet.has(key));

key = null;     //移除key的原始引用
console.log(weakSet.has(key));
输出结果：
true
false
```



**WeakSet集合与普通Set集合还有以下几个区别：**

1. 在WeakSet实例中，如果向`add()`方法传入非对象参数会导致程序报错，而向`has()`和`delete()`方法传入非对象参数则会返回false。
2. WeakSet不可迭代，所以不能用于for-of循环。
3. WeakSet不暴露任何迭代器（例如`keys()`和`values()`方法），所以无法通过程序本身来检测其中的内容。
4. WeakSet集合不支持`forEach()`方法
5. WeakSet集合不支持size属性

如果你只需要跟踪对象引用，那么更应该使用WeakSet集合。