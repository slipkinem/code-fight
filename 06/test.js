/**
 * Created by slipkinem on 2016/11/8.
 */

(function a() {
    a = 1;  //全局变量?
    console.info(a); //[Function: a]
    console.info(a === arguments.callee); //true
})();
console.log(a); //not defined
console.log(global.a); //not defined
