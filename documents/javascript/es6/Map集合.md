[TOC]

ES6中新增的Map集合是一种存储多个键值对的有序列表，其中的键和值支持所有的数据类型，键的等价性判断是通过`Object.is()`方法实现的。



# 1 Map

## 1.1 基础操作

```
let map = new Map();

//添加
map.set('name','jack');
map.set('age',25);

//判断是否存在
console.log(map.has('name'));

//获取键对应的值
console.log(map.get('name'));

//获取map大小
console.log(map.size);

//删除键
map.delete('name');

console.log(map.has('name'));
console.log(map.size);

//清空map
map.clear();
console.log(map.has('age'));
console.log(map.size);

输出结果：
true
jack
2
false
1
false
0
```



## 1.2 初始化

可以向Map构造函数传入数组来初始化一个Map集合。数组中的每个元素都是一个子数组，子数组中包含一个键值对的键与值两个元素。

```
let map = new Map([['name','rose'],['age',15]]);

console.log(map.get('name'));
console.log(map.get('age'));
输出结果：
rose
15
```



## 1.3 forEach

Map集合的`forEach()`方法回调函数可以接受3个参数：下一次索引的位置、键、Map集合本身。

```
let map = new Map([['name','rose'],['age',15]]);

map.forEach((index,key,self) => {
    console.log(index,key,self);
});
输出结果：
rose name Map { 'name' => 'rose', 'age' => 15 }
15 'age' Map { 'name' => 'rose', 'age' => 15 }
```



# 2 WeakMap

WeakMap集合是弱引用Map集合，集合中的键必须是对象。



**基础操作**

```
let map = new WeakMap();

let key = {};

//添加
map.set(key,'tom');

//查找
console.log(map.get(key));

//删除
map.delete(key);

//判断
console.log(map.has(key));

map.set(key,'tom2');
console.log(map.has(key));
key = null;
console.log(map.has(key));

输出结果：
tom
false
true
false
```



WeakMap同样可以通过传入数组来初始化。

当需要在WeakMap和普通Map之间做选择时，需要考虑的主要问题是：是否只用对象作为集合的键。 如果是，那么WeakMap是最好的选择。