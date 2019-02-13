//iterator迭代器
// iterator迭代器是ES6非常重要的概念，但是很多人对它了解的不多，但是它却是另外4个ES6常用特性的实现基础（解构赋值，剩余/扩展运算符，生成器，for of循环），
// 了解迭代器的概念有助于了解另外4个核心语法的原理，另外ES6新增的Map,Set数据结构也有使用到它
// 对于可迭代的数据解构，ES6在内部部署了一个[Symbol.iterator]属性，它是一个函数，执行后会返回iterator对象（也叫迭代器对象，也叫iterator接口），拥有[Symbol.iterator]属性的对象即被视为可迭代的
// 默认具有iterator接口的数据结构有以下几个，注意普通对象默认是没有iterator接口的（可以自己创建iterator接口让普通对象也可以迭代）
// 1.array
// 2.map
// 3.set
// 4.string
// 5.typeArray（类数组）
// 6.函数的arguments对象
// 7.nodeList对象

// iterator迭代器是一个对象，它具有一个next方法所以可以这么调用
let arr = [1, 2, 3];
// [Symbol.iterator]执行后返回一个iterator对象
let iterator = arr[Symbol.iterator]();   //需要使用键名的形式访问Symbol.iterator
iterator.next();    // {value:1, done:false}
iterator.next();    // {value:2, done:false}
iterator.next();    // {value:3, done:false}
iterator.next();    // {value:undefined, done:true}
// next方法返回又会返回一个对象，有value和done两个属性，value即每次迭代之后返回的值，而done表示是否还需要再次循环，可以看到当value为undefined时，done为true表示循环终止
