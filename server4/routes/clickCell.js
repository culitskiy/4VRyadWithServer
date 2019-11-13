const {verticalCheck} = require('../functions/verticalCheck.js');
const {horizontalCheck} = require('../functions/horizontal.js');
const {diagonalCheck} = require('../functions/diagonalCheck.js');
const Room = require('../models/room');

exports.plugin = {
    register: (server) => {
        server.route({
            method: "POST",
            path: '/clickCell',
            handler: async (req, h) => {
                const {idCol, idCell, idRoom, playerName} = req.payload;
               
                
                const room = await Room.findOne({idRoom: idRoom}).then((room) => {
                    return room;
                });
                const column = room.gameTable[req.payload.idCol];
              

                const roomData = await Room.findOne({idRoom: idRoom}).then(async(room) => {
                    
                    for(let i = 0; i < column.length; i++){
                        if(column[i] === 0 && (column[i+1] !== 0 || i+1 === column.length)){
                            room.gameTable[req.payload.idCol][i] = room.player;
                        }
                    }  
                   
                    let player;
                    if(room.player === 2){
                        player = 1;
                    }else if(room.player === 1){
                        player = 2;
                    }else{
                        player = 1
                    }
                    
                    await Room.updateOne({idRoom: idRoom},{gameTable: room.gameTable, player: player});
                    return await Room.findOne({idRoom: idRoom});
                    
                });
               
               
                horizontalCheck(roomData.gameTable, roomData.player, roomData);
                diagonalCheck(roomData.gameTable, roomData.player, roomData);
                await verticalCheck(roomData.gameTable, roomData.player, roomData);
                await Room.updateOne({idRoom: idRoom},{winner: roomData.winner});

                return roomData;
            }
        });
    },
    name: 'clickCell'
};