let Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const Room = require('./models/room');
const User = require('./models/user');

mongoose.connect('mongodb://localhost/gamedb', { useMongoClient: true})
    .then(() => console.log('MongoDb Conected...'))
    .catch( err => console.error(err));

const server = new Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: true
    }
});
server.state('token', {
    ttl: 24 * 60 * 60 * 1000,
    isSecure: false,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: true,
    strictHeader: false,
});

let data = [];
Room.find({}, (err, docs) => {
    data.push(...docs);
});

const rooms = [data];
const users = [];
User.find({}, (err, docs) => {
    users.push(...docs);
});

const init = async () => {
    await server.register([
        {
            plugin: require('hapi-cors'),
            options: {
                origins: ['http://localhost:5000']
            }
        },
        {
            plugin: require('./routes/restart'),
            // options: {
            //     data: data
            // }
    
        },{
        plugin: require('./routes/clickCell'),
        // options: {
        //     data: data
        // }

    }, {
        plugin: require('./routes/gameData'),
        // options: {
        //     data: data
        // }

    },
    {
        plugin: require('./routes/addRoom'),
        // options: {
        //     mongoose: mongoose,
        //     data: data
        // }

    },{
        plugin: require('./routes/initialRooms'),
        // options: {
        //     rooms: rooms,
        //     data: data
        // }

    },{
        plugin: require('./routes/enterData'),
        // options: {
        //     rooms: rooms
        // }

    },{
        plugin: require('./routes/register'),

    },
    {
        plugin: require('./routes/deleteRoom'),
        // options: {
        //     data: data,
        // }
    },{
        plugin: require('@hapi/cookie')
    },{
        plugin: require('./routes/enterTheRoom'),
        // options:{
        //     rooms: rooms,
        //     users: users
        // }

    },{
        plugin: require('./routes/exitRoom'),

    },{
        plugin: require('./routes/exitProfile'),

    },{
        plugin: require('./routes/initialPlayer'),

    }
]).catch(err => {
        console.log(err);
    });
    
    await server.start();
   console.log('Server started');
};


init();

let io = require('socket.io')(server.listener);
io.on('connection', (socket) => {
   
   socket.on('updateRooms', () => {
       console.log('update')
       io.emit('updateRoom');
       
   });

   socket.on('clickGame', (dataSocket) => {
       console.log('updateGame');
       io.emit('updateGame',{idCol: dataSocket.idCol, idCell: dataSocket.idCell, player: dataSocket.player});
   });

});