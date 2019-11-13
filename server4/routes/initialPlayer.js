const User = require('../models/user');
const Room = require('../models/room');


exports.plugin = {
    register: (server) => {
        server.route({
            method: 'GET',
            path: '/initialPlayer',
            handler:async (req, h) => {
               
                try{
                    let playerName = await User.findOne({key: req.state.token.token}).then((user) => {
                        return user.email;
                    });
                    
                    return playerName;
                }catch(e) {
                    return 'error';
                }
                
            }
        });
    },
    name: 'initialPlayer'
};