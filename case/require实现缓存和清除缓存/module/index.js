
module.exports=new Date();

/*暴露函数实现不清除缓存，但又重新执行这里的代码
module.exports=()=>{
    console.log('execute');
    return new Date();
}
*/
