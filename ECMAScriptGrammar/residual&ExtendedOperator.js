//剩余/扩展运算符

// 剩余/扩展运算符同样也是ES6一个非常重要的语法，使用3个点（...），后面跟着一个数组，它使得可以"展开"这个数组，可以这么理解，
// 数组是存放元素集合的一个容器，而使用剩余/扩展运算符可以将这个容器拆开，这样就只剩下元素集合，你可以把这些元素集合放到另外一个数组里面
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5, 6]; // [1,2,3,4,5,6]


//扩展运算符
//只要含有iterator接口的数据结构都可以使用扩展运算符
//扩展运算符可以和数组的解构赋值一起使用，但是必须放在最后一个，因为剩余/扩展运算符的原理其实是利用了数组的迭代器，它会消耗3个点后面的数组的所有迭代器，
// 读取所有迭代器的value属性，剩余/扩展运算符后不能在有解构赋值，因为剩余/扩展运算符已经消耗了所有迭代器，而数组的解构赋值也是消耗迭代器，但是这个时候已经没有迭代器了，所以会报错
let [first, ...arr3] = [1, 2, 3, 4, 5]; //success
first; //1
arr3; //[2,3,4,5]
// 这里first会消耗右边数组的一个迭代器，...arr会消耗剩余所有的迭代器，而第二个例子...arr直接消耗了所有迭代器，导致last没有迭代器可供消耗了，所以会报错，因为这是毫无意义的操作
let [...arr3, last] = [1, 2, 3, 4, 5];   //Uncaught SyntaxError: Rest element must be last element


//剩余扩展器
// 剩余运算符最重要的一个特点就是替代了以前的arguments
// 访问函数的arguments对象是一个很昂贵的操作，以前的arguments.callee也被废止了，建议在支持ES6语法的环境下不要在使用arguments，
// 使用剩余运算符替代（箭头函数没有arguments，必须使用剩余运算符才能访问参数集合）
function func(a, b, c) {
    console.log(arguments[0], arguments[1], arguments[2])
}

func(1, 2, 3);

// rest为形参，承载了所有的函数参数，可以随意取名
function func1(...rest) {
    console.log(rest);  // [1,2,3]
}

func1(1, 2, 3);
// 剩余运算符和扩展运算符的区别就是，剩余运算符会收集这些集合，放到右边的数组中，扩展运算符是将右边的数组拆分成元素的集合，它们是相反的

//例子
// 使用扩展运算符可以快速的将类数组转为一个真正的数组
let nodeList = document.querySelectorAll('div');    //返回一个nodelist类数组
// 类数组中iterator接口可以使用扩展运算符
let arr = [nodeList];
arr; //所以div组成的dom数组

// 合并数组
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [...arr1, ...arr2];   //1,2,3,4,5,6

// 函数柯里化
const curry = (fn) => {
    if (fn.length <= 1) return fn;
    const generator = (args) => (args.length === fn.length ? fn(...args) : arg => generator([...args, arg]));
    return generator([]);
};