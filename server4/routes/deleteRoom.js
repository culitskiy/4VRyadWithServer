const Room = require('../models/room');
const User = require('../models/user');

exports.plugin = {
    register: (server) => {
        server.route({
            method: 'POST',
            path: '/deleteRoom',
            handler: async (req, h) => {
                const email = await User.findOne({key: req.state.token.token}).then((user) => {
                    return user.email;
                });
                await Room.findOne({idRoom: req.payload.idRoom}).then( async(room) => {
                    if(room.player1Name === email || room.player2Name === email
                        || room.player1Name === '' || room.player2Name === '' ){
                            await Room.findOneAndRemove({idRoom: req.payload.idRoom});
                            console.log('ok');
                    }
                });
                return 'ok';
            }
        });
    },
    name: 'deleteRoom'
};