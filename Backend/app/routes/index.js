const express = require('express')
const router = express.Router()

let isAuthenticated = ((req, res, next) => {
    if(req.isAuthenticated())
        return next()
    res.redirect('/')
})

module.exports = function(passport){
    // GET //
    router.get('/', (req, res) =>{
        console.log('page connexion')
    })

    router.get('/home',isAuthenticated, (res,req) =>{
        console.log("page d'acceuil")
    })

    router.get('/signup', ((req,res) =>{
        console.log("page d'inscription")
    }))

    router.get('/signout', (req,res) =>{
        req.logOut();
        console.log('Déconnecter, retour à la page de connexion')
    })

    // POST //
    router.post('/login', (req, res, nxt) =>{
        passport.authenticate('login', (err, user, info) =>{
            if(err) { return nxt(err) }
            if(!user) { return res.send(req.flash('message')) }
            req.logIn(user,(err) =>{
                if(err) { return nxt(err) }
                return res.send(true)
            })
        })(req,res,nxt)
    })
    

    router.post('/signup', passport.authenticate('signup', (req, res) =>{
        res.redirect('/home')
    }))

    return router
}