
const fs=require('fs');
const path=require('path');
const less=require('less');

var lessfile=path.join(__dirname,'./less/index.less');
var distfile=path.join(__dirname,'./dist/index.css');

fs.watchFile(lessfile,{interval:1000},(cur,pre)=>{

    //如果文件没有变更
    if(cur.ctime==pre.ctime){
        return;
    }

    //如果变更则读取less文件
    fs.readFile(lessfile,'utf8',(err,data)=>{

        if(err) throw err;

        //编译less文件
        less.render(data,(err,style)=>{

            if(err) throw err;

            //console.log(style);//{ css: 'body {\n  background-color: red;\n}\n', imports: [] }
            //style.css就是编译后的css
            fs.writeFile(distfile,style.css,(err)=>{
                if(err) throw err;
                console.log('compile less file sucess');
            });

        })

    });

})