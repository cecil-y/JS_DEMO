//箭头函数 =>

//与function定义的函数的区别
// 1.箭头函数没有arguments（建议使用更好的语法，剩余运算符替代）
// 2.箭头函数没有prototype属性，没有constructor，即不能用作与构造函数（不能用new关键字调用）
// 3.箭头函数没有自己this，它的this是词法的，引用的是上下文的this，即在你写这行代码的时候就箭头函数的this就已经和外层作用域的this绑定了
let controller = {
    makeRequest: function () {
        setTimeout(function () {
            console.log(this.a) //undefined
        })
    },
    a: 1
};
controller.makeRequest();
// 因为setTimeout会将一个匿名的回调函数推入异步队列，而回调函数是具有全局性的，即在非严格模式下this会指向window，就会存在丢失变量a的问题，
// 而如果使用箭头函数，在书写的时候就已经确定它的this等于它的上下文（这里是makeRequest的函数作用域，
// 相当于讲箭头函数中的this绑定了makeRequest作用域中的this），所以this就指向了makeRequest作用域中的a变量
// 箭头函数中的this即使使用call,apply,bind也无法改变指向（这里也验证了为什么ECMAScript规定不能使用箭头函数作为构造函数，因为它的this已经确定好了无法改变）

//例子：
let controller1 = {
    makeRequest: function () {
        let that = this;
        setTimeout(function () {
            console.log(that.a); //1
        })
    },
    a: 1
};
controller1.makeRequest();
//使用箭头函数
let controller2 = {
    makeRequest: function () {
        // 省略了保存that的步骤
        setTimeout(()=>{
            console.log(this.a) // 1
        })
    },
    a:1
};
controller2.makeRequest();
// 值得注意的是makeRequest后面的function不能使用箭头函数，因为这样它就会再使用上层作用域的this，而再上层是全局作用域，this的值就会指向window

//例子：
// 在数组的迭代中使用箭头函数更加简洁，并且省略了return关键字
let arr = [1,2,3];
arr.filter(item => item === 2);  //[2]
arr.map(item => item*2); // [2,4,6]
arr.reduce((acc,cur) => acc + cur); // 6
// 不要在可能改变this指向的函数中使用箭头函数，类似Vue中的生命周期函数，Vue将生命周期函数中的this绑定了当前组件的vm实例，
// 如果使用箭头函数会强行改变this，因为箭头函数优先级最高（无法再使用call,apply,bind改变指向）
