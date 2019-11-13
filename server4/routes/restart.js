const Room = require('../models/room');
exports.plugin = {
    register: (server) => {
        server.route({
            method: "POST",
            path: '/restart',
            handler:async (req, res) => {
                
                await Room.updateOne({idRoom: req.payload.idRoom},{
                    gameTable: [
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0]
                    ],
                    player: 1,
                    
                    firstLoad: 0,
                    canClick: true,
                    winner: '',
                });
               
                return await Room.findOne({idRoom: req.payload.idRoom})
            }
        });
    },
    name: 'restart'
};