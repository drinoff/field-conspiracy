function RandomIDGen() {
    let r = (Math.random() + 1).toString(36).substring(2);
    return r;
}
let result = RandomIDGen();
let result1 = RandomIDGen();
let result2 = RandomIDGen();
let result3 = RandomIDGen();
let result4 = RandomIDGen();
console.log(result,result1,result2,result3,result4);
