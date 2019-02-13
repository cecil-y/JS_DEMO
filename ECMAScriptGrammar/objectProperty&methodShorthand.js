//对象属性&方法简写


//对象属性简写
let k = 0;
let obj = {
    k //es6允许省略k:
};
// 注意：省略的是属性名而不是值；省略的是属性名而不是值

// 对象属性简写经常与解构赋值一起使用
let bar = () => ({x: 4, y: 5, z: 6});
let {x: x, y: y, z: z} = bar();
// 简写为
let {x, y, z} = bar();
// 结合上文的解构赋值，这里的代码会其实是声明了x,y,z变量，因为bar函数会返回一个对象，这个对象有x,y,z这3个属性，解构赋值会寻找等号右边表达式的x,y,z属性，找到后赋值给声明的x,y,z变量


//方法简写
// es6允许当一个对象的属性的值是一个函数（即是一个方法），可以使用简写的形式
// es5
let obj1 = {
    func: function () {

    }
};
// es6
let obj2 = {
    func() {

    }
};
// 箭头函数
let obj3 = {
    func: () => {

    }
};