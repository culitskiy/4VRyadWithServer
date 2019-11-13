const Room = require('../models/room');
const User = require('../models/user')

exports.plugin = {
    register: (server) => {
        server.route({
            method: 'GET',
            path: '/initialRooms',
            handler: async (req, h) => {
                let player;
                try{
                    await User.findOne({key: req.state.token.token}).then((user) => {
                        if(user){
                            player = user.email;
                        }else return false;
                        
                    });
                    const rooms = await Room.find();
                   
                    return  {data: rooms, player: player} ;
                } catch(e) {
                    return false;
                }
                
            }
        });
    },
    name: 'initialRooms'
};