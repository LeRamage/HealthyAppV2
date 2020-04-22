const login = require('./login')
const signup = require('./signup')
const User = require('../models/user.model')

// Initialise passport avec les fonctions (stratégie) login et signup
module.exports = function(passport) {
    // PASSPORT CONFIG //
    passport.serializeUser((user,done) =>{
        done(null,user._id);
    })

    passport.deserializeUser((id,done) =>{
        User.findById(id, (err, user) =>{
            done(err, user)
        })
    })

    login(passport)
    signup(passport)
}


