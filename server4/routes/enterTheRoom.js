const User = require('../models/user');
const Room = require('../models/room');

exports.plugin = {
    register: (server) => {
        server.route({
            method: 'POST',
            path: '/enterTheRoom',
            handler: async (req, h) => {
              const {idRoom} = req.payload;
              const cookieToken = req.state.token.token;
              const user = await User.findOne({key: cookieToken}).then((user) => {
                return {token: user.key, email: user.email};
              });

              if(cookieToken === user.token){
                await  User.updateOne({email : user.email}, {idRoom: idRoom});
                
                await Room.findOne({idRoom: idRoom}).then( async (room) => {
                  if (room.player1Name === user.email || room.player2Name === user.email){
                    return;
                  }else if (room.player1Name === ''){
                    await Room.updateOne({idRoom : idRoom}, {player1Name: user.email});
                  }else if(room.player2Name === ''){
                    await Room.updateOne({idRoom : idRoom}, {player2Name: user.email});
                  }else{return "This room is busy"};
              });
              }
              return 'ok';
              
            }
        });
    },
    name: 'enterTheRoom'
};