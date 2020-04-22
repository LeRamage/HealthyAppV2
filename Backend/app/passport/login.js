var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user.model');
var bCrypt = require('bcrypt-nodejs');

// STRATEGIE POUR LE LOGIN //
module.exports = function(passport){
    passport.use(
        'login', 
        new LocalStrategy(
            {passReqToCallback:true},
            (req, username, password, done) =>{
                User.findOne(
                    {'username':username},
                    (err, user) =>{
                        if(err)
                            return done(err)
                        if(!user){
                            console.log("L'utilisateur "+username+" n'a pas été trouvé")
                            return done(null, false, req.flash('message', 'Utilisateur non trouvé'))
                        }
                        if(!isValidPassword(user, password)){
                            console.log('Mot de Passe invalide!')
                            return done(null,false,req.flash('message','Mot de Passe invalide'))
                        }
                        return done(null, user)
                    }
                )
            }
        )
    )

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password)
    }
}
