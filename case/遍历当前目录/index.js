
const fs=require('fs');
const path=require('path');

var dir=path.join(__dirname,process.argv[2] || './');
//读取目录
fs.readdir(dir,(err,files)=>{

    console.log(`日期\t\t时间\t大小\t文件名\t\t类型`);
    //遍历目录下的文件和文件夹
    files.forEach(file => {
        var absolutePath=path.join(dir,file);

        fs.stat(absolutePath,(err,stats)=>{

            var year=stats.ctime.getFullYear(),
                mon=stats.ctime.getMonth()+1,
                day=stats.ctime.getDate(),
                hour=stats.ctime.getHours(),
                min=stats.ctime.getMinutes();
               
            if(stats.isDirectory()){//目录
                console.log(`${year}/${mon}/${day}\t${hour}:${min}\t${format(stats.size)}\t${file}\t\tdir`);
            }else{//文件
                console.log(`${year}/${mon}/${day}\t${hour}:${min}\t${format(stats.size)}\t${file}\tfile`);
            }

        });

        /**
        * 这里stat有个问题
        * 文件信息输出先后不确定
        * 原因
        * 在读取文件信息的时间不确定，谁先读完谁先执行回调，谁先输出
        * 解决
        * 使用同步读取statSync
        */
    });

});

/**
 * 格式化数字
 * @param {number/string} num 
 * @param {string} sep 
 */
function format(num,sep){

    sep=sep||',';
    num=''+num;

    var str='',
        len=num.length;

    //小于或等于3位
    if(len<=3){
        return  num;
    }
    //拼接字串
    for(var i=len;i>0;i--){
        if(i%3===0){
            str+=sep+num[len-i];
        }else{
            str+=num[len-i];
        }
    }
    return str;
    /*
    var str='',
        iNum=0,
        len=num.length;
    for(var i=len;i>=0;i--){
        iNum++;
        if(iNum%3===0){
            str+=num[i]+sep;
        }else{
            str+=num[i];
        }
    }

    console.log(str.split('').reverse().join(''));
    */

}