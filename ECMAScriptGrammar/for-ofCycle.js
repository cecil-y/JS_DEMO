// for...of 循环


// for ... of是作为ES6新增的遍历方式,允许遍历一个含有iterator接口的数据结构并且返回各项的值,和ES3中的for ... in的区别如下
// 1.for ... of遍历获取的是对象的键值,for ... in 获取的是对象的键名
// 2.for ... in会遍历对象的整个原型链,性能非常差不推荐使用,而for ... of只遍历当前对象不会遍历原型链
// 3.对于数组的遍历,for ... in会返回数组中所有可枚举的属性(包括原型链),for ... of只返回数组的下标对于的属性值

// 对于数组的遍历,for ... in会返回数组中所有可枚举的属性(包括原型链),for ... of只返回数组的下标对于的属性值
let arr = [1, 2, 3, 4, 5];
let iterator = arr[Symbol.iterator]();
for (let value, res; (res = iterator.next()) && !res.done;) {
    value = res.value;
}
// 可以看到只要满足第二个条件(iterator.next()存在且res.done为true)就可以一直循环下去,并且每次把迭代器的next方法生成的对象赋值给res,
// 然后将res的value属性赋值给for ... of第一个条件中声明的变量即可,res的done属性控制是否继续遍历下去

// for... of循环同时支持break,continue,return(在函数中调用的话)并且可以和对象解构赋值一起使用

let arr1 = [{a: 1}, {a: 2}, {a: 3}];
let obj = {};
for({a:obj.a} of arr1){
    obj.a  // 1 => 2 => 3
    // do something
}
// arr数组每次使用for ... of循环都返回一对象({a:1},{a:2},{a:3}),然后会经过对象解构,寻找属性为a的值,赋值给obj.a,所以在每轮循环的时候obj.a会分别赋值为1,2,3

