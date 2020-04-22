const dbConfig = require('../config/db.config')

const mongoose = require("mongoose")
mongoose.Promise = global.Promise // permet de céer des opérations asynchrones

const db = {} // la data
db.mongoose = mongoose
db.url = dbConfig.url
db.user = require("./user.model.js")

module.exports = db;