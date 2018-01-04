
const fs=require('fs');
const path=require('path');

//读取图片
fs.readFile('index.png',(err,data)=>{

    if(err) throw err;

    //将图片转换成base64编码，写入txt文件
    fs.writeFile('index.txt',data.toString('base64'),(err)=>{
        if(err) throw err;
    })

});