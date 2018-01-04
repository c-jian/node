
const fs=require('fs');
const path=require('path');

var filename=path.join(__dirname,'./read.msi');

var reader=fs.createReadStream(filename);//创建可读流

//创建可写流
var writer1=fs.createWriteStream(path.join(__dirname,'./newfile1.msi'));
var writer2=fs.createWriteStream(path.join(__dirname,'./newfile2.msi'));

//传输到可写流
reader.pipe(writer1);
reader.pipe(writer2);