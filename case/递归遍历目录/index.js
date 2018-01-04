
const fs=require('fs');
const path=require('path');

var dir=path.join(__dirname,process.argv[2] || './');

var level=0;
readdir(dir,level);
//┝ ┗ │
function readdir(dir,level){
    
    var str=new Array(level+1).join('│ ');//有多少数组元素就有多少个| 
   
    var files=fs.readdirSync(dir);
    //dirArr=fileArr=[]; //这样写对于数组会出错
    var dirArr=[];
    var fileArr=[];

    files.forEach(file => {

        //读取文件信息
        var absolutePath=path.join(dir,file);
        var stats=fs.statSync(absolutePath);

        //目录和文件区别开
        if(stats.isDirectory()){
            dirArr.push(file);
        }else{
            fileArr.push(file);
        }

    });

    //目录
    dirArr.forEach(diritem=>{
        console.log(str+'┝'+diritem);
        readdir(path.join(dir,diritem),level+1);
    });

    //文件
    var len=fileArr.length-1;
    fileArr.forEach((fileitem,i)=>{
        var sep=len==i?'┗':'┝';
        console.log(str+sep+fileitem);
    });
        

}
