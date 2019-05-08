console.log('hello');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const config = require('./config/config');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app)

sequelize.sync()
    .then(() =>{
        app.listen(config.port);
        http.listen(3000);
        io.on('connection', function (socket) {
            console.log('A user has connected')
            socket.on('disconnect', function () {
                console.log('User disconnected')
            })
            socket.on('SEND_MESSAGE', function(data){
                console.log(data.message)
                socket.emit('MESSAGE', data.message)
            })
        })
        console.log('Server started on port ' + config.port)
    });