const fs=require('fs');
const path=require('path');
/**
 * 创建目录
 * @param {string} pathname 
 */
function mkdir(pathname){

    var dirname=path.dirname(module.parent.filename);//父级目录
    var relativePath=path.relative(dirname,pathname);//相对父级的相对路径
    var str='';

    var arr=relativePath.split(path.sep);//以path.sep拆分
    
    //循环遍历
    arr.forEach(item => {

        str+=item+path.sep;//拼接
        pathname=path.join(dirname,str);//得到绝对路径

        try {
            fs.statSync(pathname);//如果报错，说明文件不存在
        } catch (error) {
            fs.mkdirSync(pathname);
        }

    });
    
    console.log('创建完成');

}

module.exports={mkdir};
