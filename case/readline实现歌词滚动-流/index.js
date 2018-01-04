
const fs=require('fs');
const path=require('path');
const readline=require('readline');
const iconv=require('iconv-lite');

var filename=path.join(__dirname,'./血染的风采.lrc');//歌词文件绝对路径
var reader=fs.createReadStream(filename).pipe(iconv.decodeStream('gbk'));//创建可读流，并对其转换编码
var rl=readline.createInterface({input:reader});//创建一个接口

var time=new Date().getTime();
//每读取一行就触发此事件
rl.on('line',line=>{
    task(line,time);
})

var reg=/\[(\d{2})\:(\d{2})\.(\d{2})\]\s*(.+)/;

function task(words,time){

    var arr=words.split('\r\n');//把每一行歌词拆分成一个一个数组元素

    //循环遍历每一行歌词
    arr.forEach(item => {
        var parts=reg.exec(item);//返回一个数组，其中存放匹配的结果

        if(parts){
            var min=parseInt(parts[1])*60*1000,//分
                sec=parseInt(parts[2])*1000,   //秒
                ms=parseInt(parts[3]),         //毫秒
                words=parts[4];                //歌词

            var endTime=new Date().getTime()-time;
            //开启定时器
            setTimeout(()=>{
                console.log(words);
            },min+sec+ms+endTime);

        }else{
           console.log(item);
        }
    });

}

//readline更详细说明：http://blog.csdn.net/Divide_/article/details/52464028

