const Room = require('../models/room');
const User = require('../models/user')

exports.plugin = {
    register: (server) => {
        server.route({
            method: 'Post',
            path: '/exitRoom',
            handler: async (req, h) => {
                const {idRoom} = req.payload;
                
                const email = await User.findOne({key: req.state.token.token}).then((user) => {
                    return user.email;
                });
                await User.updateOne({key: req.state.token.token},{idRoom: ''});
                await Room.findOne({idRoom: idRoom}).then(async(room) => {
                    if(room.player1Name === email){
                       await Room.updateOne({idRoom: idRoom},{player1Name: ''});
                    }else if(room.player2Name === email){
                       await Room.updateOne({idRoom: idRoom},{player2Name: ''});
                    }
                });
               
                return 1;
            }
        });
    },
    name: 'exitRoom'
};