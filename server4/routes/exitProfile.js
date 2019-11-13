const Room = require('../models/room');
const User = require('../models/user')

exports.plugin = {
    register: (server) => {
        server.route({
            method: 'Post',
            path: '/exitProfile',
            handler: async (req, h) => {
                
                try{
                    const user = await User.findOne({key: req.state.token.token}).then((user) => {
                        return {email: user.email, idRoom: user.idRoom};
                    });
                    
                    await User.updateOne({key: req.state.token.token},{idRoom: '', key: ''});
                    await Room.findOne({idRoom: user.idRoom}).then(async(room) => {
                        if(room.player1Name === user.email){
                           await Room.updateOne({idRoom: user.idRoom},{player1Name: ''});
                        }else if(room.player2Name === user.email){
                           await Room.updateOne({idRoom: user.idRoom},{player2Name: ''});
                        }
                    });
                    return false;
                }catch(e){
                    return false;
                }
            }
        });
    },
    name: 'exitProfile'
};