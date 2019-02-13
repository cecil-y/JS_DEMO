// promise

// Promise作为ES6中推出的新的概念，改变了JS的异步编程，现代前端大部分的异步请求都是使用Promise实现，fetch这个web api也是基于Promise的


//回调函数
// 众所周知，JS是单线程的，因为多个线程改变DOM的话会导致页面紊乱，所以设计为一个单线程的语言，但是浏览器是多线程的，
// 这使得JS同时具有异步的操作，即定时器，请求，事件监听等，而这个时候就需要一套事件的处理机制去决定这些事件的顺序，即Event Loop（事件循环），
// 这里不会详细讲解事件循环，只需要知道，前端发出的请求，一般都是会进入浏览器的http请求线程，等到收到响应的时候会通过回调函数推入异步队列，等处理完主线程的任务会读取异步队列中任务，执行回调


// promise
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('I have been resolved')
    }, 2000)
});
promise.then(res => {
    console.log(res) //2s后答应字符
});
// Promise并不是回调函数的衍生版本，而是2个概念，所以需要将之前的回调函数改为支持Promise的版本，这个过程成为"提升"，或者"promisory"，
// 现代MVVM框架常用的第三方请求库axios就是一个典型的例子，另外nodejs中也有bluebird，Q等
