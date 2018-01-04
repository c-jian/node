
const net=require('net');
const readline=require('readline');

const rl=readline.createInterface(process.stdin,process.stdout);

var serverSocket=null;

(function circle(){
    //问一个问题
    rl.question('Your name:',name=>{

        //如果名字为空
        if(name===''){
            circle();
            return;
        }
    
        rl.setPrompt(name+':');
        
        //建立链接
        serverSocket=net.connect({port:8080},()=>{

            console.log(name+' welcome to chat!');//输出欢迎信息
            rl.prompt();

            //监听输入
            rl.on('line',line=>{
    
                if(line==='') return;
                
                var sendToServer={
                    procotol:"broadcast",
                    from:name,
                    message:line
                };

                serverSocket.write(JSON.stringify(sendToServer));
                
            });
        
        });

        //监听服务器端的信息
        serverSocket.on('data',(data)=>{

            var transferData=JSON.parse(data.toString());

            //判断当前使用什么协议
            switch(transferData.procotol){
                case 'broadcast':
                    console.log(transferData.from+' say:'+transferData.message);
                    rl.prompt();
                break;
            }
        })

    });

})()



