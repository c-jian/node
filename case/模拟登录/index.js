
//账号密码
var merber={
    'admin':'admin',
    'cj':'cj',
    'ws':'ws123'
}

process.stdout.write('请输入用户名：');//初始提示

var uname='';
//监听输入的内容
process.stdin.on('data',line=>{

    line=line.toString().trim();//Buffer转字串，再去掉换行\n

    if(uname===''){ //第二次uname就不为空了，就该判断密码了

        if(Object.keys(merber).indexOf(line)===-1){
            console.log('用户名不正确');
            process.stdout.write('请输入用户名：');
        }else{
            uname=line;
            process.stdout.write('请输入密码：');
        }

    }else{

        if(merber[uname]===line){
            console.log('欢迎'+uname+'登录');
        }

    }
    

})





