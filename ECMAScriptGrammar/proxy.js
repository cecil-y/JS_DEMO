// 代理[拦截器的一种]

// Proxy作为一个"拦截器",可以在目标对象前架设一个拦截器,他人访问对象,必须先经过这层拦截器,Proxy同样是一个构造函数,使用new关键字生成一个拦截对象的实例,
// ES6提供了非常多对象拦截的操作,几乎覆盖了所有可能修改目标对象的情况(Proxy一般和Reflect配套使用,前者拦截对象,后者返回拦截的结果,Proxy上有的的拦截方法Reflect都有)

let obj = {};
obj = new Proxy(obj, {
    set(target, p, value, receiver) {
        console.log('oops');
        return Reflect.set(target, p, value, receiver);
    }
});
obj.foo = 'bar'; // oops


//**********Object.defineProperty**********
// 这个api可以给一个对象添加属性以及这个属性的属性描述符/访问器(这2个不能共存,同一属性只能有其中一个),属性描述符有configurable,writable,enumerable,value这4个属性,
// 分别代表是否可配置,是否只读,是否可枚举和属性的值,访问器有configurable,enumerable,get,set,前2个和属性描述符功能相同,后2个都是函数,
// 定义了get,set后对元素的读写操作都会执行这个函数,并且覆盖默认的读写行为
let obj1 = {};
Object.defineProperty(obj1, "a", {
    configurable: true,
    enumerable: true,
    value: "1",
    writable: false
});
obj1.a; // 1
obj1.a = 1; //Uncaught TypeError: Cannot assign to read only property 'a' of object '#<Object>'
Object.keys(obj1); // []
let obj2 = {};
Object.defineProperty(obj2, "b", {
    configurable: true,
    enumerable: true,
    get() {
        return 1;
    }
});
obj2.b; // 1
obj2.b = 2; // Uncaught TypeError: Cannot set property b of #<Object> with has only a getter
// 定义了obj中a属性的表示为只读,且不可枚举,obj2定义了get,但没有定义set表示只读,并且读取obj2的b属性返回的值是get函数的返回值
// ES5中的Object.defineProperty这和Proxy有什么关系呢?个人理解Proxy是Object.defineProperty的增强版,ES5只规定能够定义属性的属性描述符或访问器.而Proxy增强到了13种


//**********handler.apply**********
// apply可以让我们拦截一个函数(JS中函数也是对象,Proxy也可以拦截函数)的执行,我们可以把它用在函数节流中
const proxy1 = (func, time) => {
    let previous = new Date(0).getTime();
    let handler = {
        apply(target, context, args) {
            let now = new Date().getTime();
            if (now - previous > time) {
                previous = now;
                Reflect.apply(func, context, args);
            }
        }
    };
    return new Proxy(func, handler);
};
//拦截后的函数
DOM.addEventListener('mousemove',proxy1(handler,TIME));


//**********handler.construct**********
// contruct可以拦截通过new关键字调用这个函数的操作,我们可以把它用在单例模式中
function proxy2(func){
    let instance ;
    let handler = {
        construct(target, args, newTarget) {
            if(!instance){
                //没有实例就创造一个实例
                instance = Reflect.construct(func,args);
            }
            // 无论如何都会返回一个实例 (new 关键字)
            return instance;
        }
    };
    return new Proxy(func,handler);
}
function Person(name,age){
    this.name = name;
    this.age = age;
}
const SingletonPerson = proxy2(Person);
let person1 = new SingletonPerson('zhl',12);
let person2 = new SingletonPerson('aas',23); //这个实例不会产生，会返回person1
console.log(person1 === person2);   // true
// 这里通过一个闭包保存了instance变量,每次使用new关键字调用被拦截的函数后都会查看这个instance变量,如果存在就返回闭包中保存的instance变量,否则就新建一个实例,这样可以实现全局只有一个实例


//**********handler.defineProperty**********
// defineProperty可以拦截对这个对象的Object.defineProerty操作
// 注意对象内部的默认的[[SET]]函数(即对这个对象的属性赋值)会间接触发defineProperty和getOwnPropertyDescriptor这2个拦截方法
function onChange(obj,callback){
    const handler = {
        get(target,key){
            try{
                return new Proxy(target[key],handler);
            }catch(e){
                Reflect.get(target,key);
            }
        },
        defineProperty(target,key,descriptor){
            callback();
            return Reflect.defineProperty(target,key,descriptor);
        }
    };
    return new Proxy(obj,handler);
}
let obj3 = onChange({},()=>{
    console.log('oops');
});
obj3.a = {}; //oops
obj3.a.b = 1; // oops
// 这里有几个知识点
// 1.这里使用了递归的操作,当需要访问对象的属性时候,会判断代理的对象属性的值仍是一个可以代理的对象就递归的进行代理,否则通过错误捕获执行默认的get函数
// 2.定义了defineProperty的拦截方法,当对这个代理对象的某个属性进行赋值的时候会执行对象内部的[[SET]]函数进行赋值,这个操作会间接触发defineProperty这个方法,随后会执行定义的callback函数
// 这样就实现了无论对象嵌套多少层,只要有属性进行赋值就会触发get方法,对这层对象进行代理,随后触发defineProperty执行callback回调函数
