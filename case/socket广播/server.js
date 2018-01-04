
const net=require('net');
const fs=require('fs');
const path=require('path');

//获取配置信息
var config=JSON.parse(fs.readFileSync(path.join(__dirname,process.argv[2] || './config/config.json'),'utf8')),
    port=config.port || 80,
    sockets=[];

//创建服务
var server=net.createServer((clientSocket)=>{

    //保存客户端socket
    sockets.push(clientSocket);

    //获取客户端ip
    var arr=clientSocket.remoteAddress.split(':');
    var ip=arr[arr.length-1];
    //输出信息
    console.log(ip+'通过'+clientSocket.remotePort+'端口进来了');

    //监听客户端信息
    clientSocket.on('data',data=>{

        var transferData=JSON.parse(data.toString());

        //判断使用的协议
        switch(transferData.procotol){
            case 'broadcast':
                broadcast(transferData,clientSocket);
            break;
        }

    })
    .on('error',(err)=>{
        sockets.splice(sockets.indexOf(clientSocket),1);
        console.log('1人下线');
    })


}).listen(port);

/**
 * 处理广播
 * @param {object} data 
 */
function broadcast(data,curSocket){

    //循环遍历每一个客户端socket
    sockets.forEach(socket=>{

        if(socket!=curSocket){
            socket.write(JSON.stringify(data));
        }

    })

}