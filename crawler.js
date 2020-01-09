const http = require('http');
const mongoose = require('mongoose')

var albumDao = require('./model') // 导入DAO

const options = {
    host: 'johnyu.cn',
    port: 3000,
    path: '/albums'
};

const req = http.request(options);
req.end();

req.on('response', (info) => {
    info.on('data', chunk => {
        console.log(chunk.toString());
        let list = chunk.toString()
        let data = {
                "data": list
            }
        mongoose.connect("mongodb://39.99.194.217/albums", function(err) {
            console.log("mongodb已连接!")
            if (!err) {
                albumDao.saveData(data)
            }
        })

    })
});
