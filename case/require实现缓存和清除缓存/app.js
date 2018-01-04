
function $require(id){

    const fs=require('fs');
    const path=require('path');

    //模块路径
    var filename=path.join(__dirname,id),
        dirname=path.dirname(filename);

    //实现缓存
    $require.cache=$require.cache || {};
    if($require.cache[filename]){
        return $require.cache[filename].exports;
    }

    //读取模块
    var code=fs.readFileSync(filename,'utf8');

    //模块作用域
    var module={id:filename,exports:{}},
    exports=module.exports;
    var code=`
        (function(__filename,__dirname,module,exports,$require){
            ${code}
        })(filename,dirname,module,exports,$require);
    `;

    //解析
    eval(code);

    //实现缓存，保存第一次的内容
    $require.cache[filename]=module;

    return module.exports;
}


setInterval(()=>{

    var date=$require('./module/index.js');

    /*
    //清空缓存
    Object.keys($require.cache).forEach((item)=>{
       delete $require.cache[item];
    });
    */

    /*
    这里对应使用暴露函数的输出
    console.log(date().getTime());
    */
    
    console.log(date.getTime());
},1000);
