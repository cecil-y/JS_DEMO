// 与var不同的是，let/const会创建一个块级作用域（通俗讲就是一个花括号内是一个新的作用域）
// 而使用使用let/const关键字声明变量的for循环，除了会创建块级作用域，let/const还会将它绑定到每个循环中，确保对上个循环结束时候的值进行重新赋值
for (let i = 0; i < 3; i++) {
    //do something
}
// 会变成
{
    let i = 0;
    // do something
}
{
    let i = 1;  //for循环会记住上次循环的结果并赋值给下个循环
    // do something
}
{
    let i = 2;
    // do something
    // end
}


//**********暂时性死区**********
if (true) {
    name = "abc";
    // 在声明变量之前是无法使用这个变量的，这个特点也是为了弥补var的缺陷
    console.log(name); //Uncaught ReferenceError: name is not undefined
    let name;
}


//**********const**********
// const定义常量，无法改变，与let的区别如下：
// 1.const声明变量的时候必须赋值，否则会报错。重新赋值的时候也会报错
const x; // Uncaught SyntaxError: Missing initializer in const declaration
// 2.const声明变量不能改变，声明一个引用类型，则不能改变他的内存地址
const obj = {a: 1};
obj.b = 2; // success
obj = {c: 3}; // Uncaught TypeError: Assignment to constant variable.
// 没有显式的声明块级作用域，let/const声明的变量却没有变为全局变量
// 这个其实也是let/const的特点，ES6规定它们不属于顶层全局变量的属性
let y = 0;
console.log(y); // undefined
var a = 1;
console.log(a); // success
// 可以看到使用let声明的变量x是在一个叫script作用域下的，而var声明的变量因为变量提升所以提升到了全局变量window对象中，
// 这使我们能放心的使用新语法，不用担心污染全局的window对象
