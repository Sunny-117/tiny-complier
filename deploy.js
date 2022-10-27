const child = require('child_process')
setInterval(() => {
    console.log('run')
    child.exec('sh cr.sh', function (err, sto) {
        console.log(sto);//sto才是真正的输出，要不要打印到控制台，由你自己啊
    })
}, Math.random() * 100000)
