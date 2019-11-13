const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';
exports.plugin = {
    register: (server) => {
        server.route({
            method: 'POST',
            path: '/enterData',
        
            options: {
                state: {
                    parse: true,
                    failAction: 'error'
                }
            },
            
            handler: async (req, h) => {

               return await User.findOne({
                        email: req.payload.email
                    })
                    .then(async (user) => {
                        if (user) {
                            if(bcrypt.compareSync(req.payload.password, user.password)){
                               let token = await jwt.sign(req.payload, process.env.SECRET_KEY, {
                                        expiresIn: 1440
                                        });
                                h.state('token', {token: token});
                               await User.updateOne({email: req.payload.email}, {key: token}, {upsert: true});
                                return true;
                            }else {
                                return { error: 'User does not exist' }}; 
                        } else {
                            return {
                                error: 'User does not exist'
                            };
                        }
                        
                    });
            },
            
        });
    },
    name: 'enterData'
};
