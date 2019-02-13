// 模块化


// ES6 Module默认目前还没有被浏览器支持，需要使用babel，在日常写demo的时候经常会显示这个错误
// Uncaught SyntaxError: Unexpected token{

// 可以在script标签中使用tpye="module“在同域的情况下可以解决（非同域情况会被同源策略拦截，webstorm会开启一个服务器没有这个问题，vscode貌似不行）
//<script type='module'>
//    import {a} from './module.js';
//    console.log(a);
//</script>

// ES6 Module使用import关键字导入模块，export关键字到出模块，它还有以下特点
// 1.ES6 Module是静态的，也就是说它是在编译阶段运行，和var以及function一样具有提升效果（这个特点使得它支持tree shaking）
// 2.自动采用严格模式（顶层的this返回undefined）
// 3.ES6 Module支持使用export {<变量>}导出具名的接口，或者export default导出匿名的接口

//导出：
let x = 20;
let y = 20;
export {x};
export default y;
//导入：
import {x} from "./module.js";
import y from "./module.js";
// 这两者的区别是，export {<变量>}导出的是一个变量的引用，export default导出的是一个值
// 就是说在a.js中使用import导入这2个变量的后，在module.js中因为某些原因x变量被改变了，那么会立刻反映到a.js，而module.js中的y变量改变后，a.js中的y还是原来的值

//这里再来说一下目前为止主流的模块化方案ES6 Module和CommonJs的一些区别
// 1.CommonJs输出的是一个值的拷贝,ES6 Module通过export {<变量>}输出的是一个变量的引用,export default输出的是一个值的拷贝
// 2.CommonJs运行在服务器上,被设计为运行时加载,即代码执行到那一行才回去加载模块,而ES6 Module是静态的输出一个接口,发生了编译的阶段
// 3.CommonJs在第一次加载的时候运行一次,之后加载返回的都是第一次的结果,具有缓存的效果,ES6 Module则没有

