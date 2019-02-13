//解构赋值

// 解构赋值可以直接使用对象的某个属性，而不需要通过属性访问的形式使用，对象解构原理个人认为是通过寻找相同的属性名，然后原对象的这个属性名的值赋值给新对象对应的属性
// 这里左边真正声明的其实是titleOne,titleTwo这两个变量，然后会根据左边这2个变量的位置寻找右边对象中title和test[0]中的title对应的值，
// 找到字符串abc和test赋值给titleOne,titleTwo（如果没有找到会返回undefined）
let {
    title: titleOne, // titleOne被被赋值为字符串的abc
    test: [
        {
            title: titleTwo // titleTwo被赋值为字符串test
        }
    ]
} = {
    title: 'abc',
    test: [
        {
            title: 'test'
        }
    ]
};
//数组解构的原理其实是消耗数组的迭代器，把生成对象的value属性的值赋值给对应的变量
let a = 1;
let b = 2;
[a,b] = [b,a];
a; // 2
b; // 1


//同样建议使用，因为解构赋值语意化更强，对于作为对象的函数参数来说，可以减少形参的声明，直接使用对象的属性（如果嵌套层数过多我个人认为不适合用对象解构，不太优雅）
//一个常用的例子是Vuex中actions中的方法会传入2个参数，第一个参数是个对象，你可以随意命名，然后使用<名字>.commit的方法调用commit函数，或者使用对象解构直接使用commit
actions:{
    increment(ctx){
        ctx.commit('increment')
    }
}
actions1:{
    increment({commit}){
        commit('increment')
    }
}
//另外可以给使用axios的响应结果进行解构
let {data} = await axios.get("http://localhost:3000");