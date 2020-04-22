// CONSTANTE VARIABLE // 
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const passport = require('passport')
const expressSession = require('express-session')
const flash = require('connect-flash');

const corsOptions = { // autorise les requête venant uniquement de origin
    origin: "http://localhost:8081",
    optionsSuccessStatus: 200
}

// MIDDLEWARE //
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true} )) // parse les requêtes en JSON avec n'importe quel type
app.use(expressSession({secret:'jkaze7726IEAertv4Fg7'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// INITIALISATION PASSPORT // 
let initPassport = require('./app/passport/init')
initPassport(passport)

// ROUTES //
const routes = require('./app/routes/index')(passport)
app.get('/',(req,res)=>{
    res.json({message:'coucou'})
})
app.use('/',routes)

// CONNEXION A LA BDD //
const db = require("./app/models")
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connexion à la base réussi!')
}).catch(err => {
    console.log('Impossible de se connecter à la base!', err)
    process.exit();
})

// PORT //
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Le serveur run sur le port ${PORT}.`)
})
