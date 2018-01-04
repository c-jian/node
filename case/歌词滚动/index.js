
const fs=require('fs');
const path=require('path');
const iconv=require('iconv-lite');

fs.readFile(path.join(__dirname,'./血染的风采.lrc'),(err,data)=>{

    var startTime=new Date().getTime();

    var song=iconv.decode(data,'gbk');//转换编码
    
    //[00:01.21] 歌曲：血染的风采
    var reg=/\[(\d{2})\:(\d{2})\.(\d{2})\]\s*(.+)/;

    var arr=song.split('\r\n');//分割
    
    arr.forEach((item)=>{

        var parts=reg.exec(item);
        if(parts){
            //歌词时间
            var min=parseInt(parts[1])*60*1000;
            var sec=parseInt(parts[2])*1000;
            var ms=parseInt(parts[3]);
            //歌词
            var words=parts[4];
            
            var endTime=new Date().getTime()-startTime;
            //设置定时器
            setTimeout(()=>{
                console.log(words);
            },min+sec+ms+endTime);
        }else{
            console.log(item);
        }

    })


})
