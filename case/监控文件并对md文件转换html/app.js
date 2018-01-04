
const fs=require('fs');
const path=require('path');
const marked=require('marked');
const bs=require('browser-sync');

var filename=path.join(__dirname,process.argv[2] || './README.md');//要监控的文件
var htmlfile=filename.replace(path.extname(filename),'.html');//转换的文件

var index=path.basename(htmlfile);

bs({
    server:path.dirname(filename),
    index:index,
    notify: false
})

//html模块
var html=`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>{{title}}</title>
    <style>{{style}}</style>
</head>
<body>
    <!-- github.css样式是由类vs包含着的 -->
	<div class="vs">{{content}}</div>
</body>
</html>
`;

//监视文件，每200毫秒轮询一次
fs.watchFile(filename,{interval:200},(cur,pre)=>{

    //如果文件没有变化
    if(cur.ctime==pre.ctime){
        return;
    }
    
    //文件发生改变
    fs.readFile(filename,'utf8',(err,data)=>{

        //报出错误信息
        if(err) throw err;

        //读取css
        fs.readFile('./github.css','utf8',(err,style)=>{

            //替换模块占位符
            var html_content=html.replace('{{content}}',marked(data))  //html_content这个变量名最好不要和html同名
                     .replace('{{style}}',style)
                     .replace('{{title}}','node');

            //重新写入
            fs.writeFile(htmlfile,html_content,(err)=>{
                if(err) throw err;
                bs.reload(index);//重载首页
            })    

        })
        
    })

})