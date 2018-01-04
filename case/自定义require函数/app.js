
function $require(id){

    //加载核心模块，作为己用
    const fs=require('fs');
    const path=require('path');

    var filename=path.join(__dirname,id), //想要加载的文件的绝对路径 
        dirname=path.dirname(filename);   //文件的绝对目录路径

    //读取文件
    var code=fs.readFileSync(filename,'utf8');
    
    //创建一个封闭的空间
    var module={id:filename,exports:{}};
    var exports=module.exports;
    var code=`
        (function(__filename,__dirname,module,exports,$require){
            ${code}
        })(filename,dirname,module,exports,$require);
    `;

    //解析成js代码
    eval(code);

    return module.exports;//将另一个文件的module.exports返回
}


var mo=$require('./module/module.js');
mo.sayname('cj');