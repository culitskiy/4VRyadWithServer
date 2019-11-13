const Room = require('../models/room');

exports.plugin = {
    register: (server, options) => {
        server.route({
            method: 'POST',
            path: '/addRoom',
            handler: async (req, h) => {
                
                const index = new Date().getTime();
            
                const room = await new Room({
                    idRoom: index,
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
                    player1Name: '',
                    player2Name: '',
                    firstLoad: 0,
                    canClick: true,
                    winner: '',
                    lastMove: null
                });
                await room.save();
    
                
                return  await Room.find() ;

            }
        });
    },
    name: 'addRoom'
};
// gameTable: Array,
//     player: Number,
//     player1Name: String,
//     player2Name: String,
//     firstLoad: Boolean,
//     canClick: Boolean,
//     winner: String,
//     lastMove: Array