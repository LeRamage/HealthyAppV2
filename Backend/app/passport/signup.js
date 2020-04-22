var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user.model');
var bCrypt = require('bcrypt-nodejs');

// Stratégie pour enregistrer un nouvel utilisateur //
module.exports = function(passport){
    passport.use(
        'signup', 
        new LocalStrategy(
            { passReqToCallback : true },
            (req, username, password, done) => {
                findOrCreateUser = function(){
                    User.findOne({ 'username' : username }, (err, user) =>{
                        if(err){
                            console.log("Une erreur est survenue lors de la recherche de l'utilisateur : "+err)
                            return done(err)
                        }
                        if(user){
                            console.log("L'utilisateur "+username+" existe déjà")
                            return done(null, false, req.flash('message','Utilisateur existe déjà'))
                        } 
                        else{
                            let newUser = new User()
                            newUser.username = username
                            newUser.password = createHash(password)

                            newUser.save(function(err) {
                                if(err){
                                    console.log("Une erreur est survenue à l'enregistrement de l'utilisateur : "+err)
                                    throw err;
                                }
                                console.log("L'utilisateur à bien été enregistré")
                                return done(null, newUser)
                            })
                        }
                    })
                }
                process.nextTick(findOrCreateUser)
            }
        )
    )
    
    let createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
    }

}