// import module
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const atkController = require('./controllers/atkController')

const app = express() // setup app server

// mongoDB URI // use node version 2.2.12 or later
let uri = "mongodb://ahmadafdhalx:test12345@ac-pddnmoq-shard-00-00.zxmupfd.mongodb.net:27017,ac-pddnmoq-shard-00-01.zxmupfd.mongodb.net:27017,ac-pddnmoq-shard-00-02.zxmupfd.mongodb.net:27017/ofser?ssl=true&replicaSet=atlas-102c3t-shard-0&authSource=admin&retryWrites=true&w=majority";
// connect to mongoDB
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, ssl: true})
    .then((result) => {
        console.log('> Connected to database!')
        app.listen(3000)
    }) // listen for request on port
    .catch((err) => console.log(err))

// set view engine
app.set('view engine','ejs') // set ejs as view engine

// middleware
app.use(express.static('public')) // static file public
app.use(morgan('dev')) // middleware information
app.use(express.urlencoded({ extended: true })) // url encoder request ke json




// routes
// route get to /request ATK
app.get('/request/atk', atkController.atk_jenis)
app.post('/atk-produk', atkController.atk_produk)




