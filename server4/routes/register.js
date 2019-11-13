const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.plugin = {
    register: (server, options) => {
        server.route({
            method: 'POST',
            path: '/register',
            handler: (req, h) => {
                
                const {login, email, password} = req.payload;
                const userData = {
                    email: email,
                    login: login,
                    password: password
                };
              
                return User.findOne({
                        email: email
                      })
                        .then(user => {
                          if (!user) {
                              
                             bcrypt.hash(password, 10, (err, hash) => {
                              userData.password = hash;
                              return User.create(userData)
                                .then(user => {
                                  return { status: user.email + ' Registered!' };
                                })
                                .catch(err => {
                                  return 'error: ' + err;
                                });
                            });
                            return {status: `${email} Registered!`};
                          } else {
                            return  {status: 'User already exists'} ;
                          }
                        })
                        .catch(err => {
                          return 'error: ' + err;
                        });
                    }
                    });
                
            },

    name: 'register'
};
