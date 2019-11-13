const User = require('../models/user');
const Room = require('../models/room');


exports.plugin = {
    register: (server) => {
        server.route({
            method: 'GET',
            path: '/gameData',
            handler:async (req, h) => {
                
                try{
                    let idRoom = await User.findOne({key: req.state.token.token}).then((user) => {
                        return user.idRoom;
                    });
                    let roomData = Room.findOne({idRoom: idRoom}).then((room) => {
                        return room
                    });
                    return roomData;
                }catch(e) {
                    return 'error';
                }
                
            }
        });
    },
    name: 'gameData'
};