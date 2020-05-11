let obj = {a:1,b:2};
function fn1 (obj={}) {
    let {a, b} = obj
}
fn1(obj)

var t = 1234;
var i = 1;

function pro() {
    return new Promise((resolve, reject) => {
        resolve();
    })
}
pro().then(console.log(1))