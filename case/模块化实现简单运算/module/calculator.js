
/**
 * 类型转换
 * @param {number} num 
 */
function parseNum(num){
    return Number(num);
}

/**
 * 加法运算
 * @param {string} p1 
 * @param {string} p2 
 */
function add(p1,p2){
    return parseNum(p1)+parseNum(p2);
}
/**
 * 减法运算
 * @param {string} p1 
 * @param {string} p2 
 */
function reduce(p1,p2){
    return parseNum(p1)-parseNum(p2);
}
/**
 * 乘法运算
 * @param {string} p1 
 * @param {string} p2 
 */
function multiply(p1,p2){
    return parseNum(p1)*parseNum(p2);
}
/**
 * 除法运算
 * @param {string} p1 
 * @param {string} p2 
 */
function except(p1,p2){
    return parseNum(p1)/parseNum(p2);
}

module.exports={add,reduce,multiply,except};//当前模块对外输出的接口