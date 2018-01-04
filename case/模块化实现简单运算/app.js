const c=require('./module/calculator');

var params=process.argv.slice(2); //获取后续参数

    //判断参数合法性
    if(params.length<3){
        throw new Error('参数不合法');
    }

//拆分命令参数
var p1=params[0],
    operator=params[1],
    p2=params[2];

var res=0;
//判断操作符，执行对应的运算
switch(operator){
    case "+":
        res=c.add(p1,p2);
    break;
    case "-":
        res=c.reduce(p1,p2);
    break;
    case "*":
    case "x":
    case "X":
        res=c.multiply(p1,p2)
    break;
    case "/":
    case "÷":
        res=c.except(p1,p2);
    break;
    default:
        throw new Error('不认识的操作符');
    break;
}

console.log(res);