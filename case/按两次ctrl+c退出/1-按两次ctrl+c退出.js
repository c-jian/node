
var isExit=false;//退出标记

process.on('SIGINT',()=>{////SIGINT这个信号是系统默认信号，代表信号中断，就是ctrl+c

    if(isExit){ //初始isExit为false

        process.exit();//退出控制台

    }else{

        isExit=true;//第一次执行这里，改为true，5秒内再按Ctrl+c就会执行上面的代码

        console.log('您确定退出吗？');//给出提示

        //5秒后没有任何操作将重来
        setTimeout(()=>{
            isExit=false;
        },5000);
    }

});