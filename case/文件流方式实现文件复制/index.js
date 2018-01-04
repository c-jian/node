
const fs = require('fs');
const path = require('path');

var filename = path.join(__dirname, './read.msi');
var newfile = path.join(__dirname, './newfile.msi');

var reader = fs.createReadStream(filename);//创建可读流
var writer = fs.createWriteStream(newfile);//创建可写流
var res = 0;

fs.stat(filename, (err, stats) => {

    if (stats) {

        //每次读取65536个字节就触发一下这个data事件
        reader.on('data', chunk => {

            writer.write(chunk, () => {
                /*
                //清空控制台
                process.stdout.write('\033[2J');
                process.stdout.write('\033[0f');
                */
                //输出进度
                console.log( (res += (chunk.length / stats.size) * 100).toFixed(2) + '%' );

            })

        })

    }

})

