// import module
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
// import controller
const atkController = require('./controllers/atkController')
const eventSuppController = require('./controllers/eventSuppController')
const consumController = require('./controllers/consumController')
const konsumsiController = require('./controllers/konsumsiController')
const workfurnController = require('./controllers/workfurnController')
const rtkController = require('./controllers/rtkController')
const expecourmailController = require('./controllers/expecourmailController')
const kartunamaController = require('./controllers/kartunamaController')



const app = express() // setup app server

// mongoDB URI // use node version 2.2.12 or later
let uri = "mongodb://ahmadafdhalx:test12345@ac-pddnmoq-shard-00-00.zxmupfd.mongodb.net:27017,ac-pddnmoq-shard-00-01.zxmupfd.mongodb.net:27017,ac-pddnmoq-shard-00-02.zxmupfd.mongodb.net:27017/ofser?ssl=true&replicaSet=atlas-102c3t-shard-0&authSource=admin&retryWrites=true&w=majority";
// connect to mongoDB
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, ssl: true})
    .then((result) => {
        app.listen(3000)
        console.log('> Connected to database!\n> https://localhost:3000')
    }) // listen for request on port
    .catch((err) => console.log(err))

// set view engine
app.set('view engine','ejs') // set ejs as view engine

// middleware
app.use(express.static('public')) // static file public
app.use(morgan('dev')) // middleware information
app.use(express.urlencoded({ extended: true })) // url encoder request ke json
app.use(express.json())

// routes
// route to /request ATK
app.get('/request/atk', atkController.atk_jenis)
app.post('/atk-produk', atkController.atk_produk)
app.post('/atk-request', atkController.atk_request)
// route to /request event support
app.get('/request/eventsupp', eventSuppController.eventsupp_jenis)
app.post('/eventsupp-request', eventSuppController.eventsupp_request)
// route to /request consumables
app.get('/request/consum', consumController.consum_jenis)
app.post('/consum-request', consumController.consum_request)
// route to /request workstation
app.get('/request/workfurn', workfurnController.workfurn_jenis)
app.post('/workfurn-produk', workfurnController.workfurn_produk)
app.post('/workfurn-request', workfurnController.workfurn_request)
// route to /request rtk
app.get('/request/rtk', rtkController.rtk_jenis)
app.post('/rtk-request', rtkController.rtk_request)
// route to /request expecourmail
app.get('/request/expecourmail', expecourmailController.page)
app.post('/expecourmail-request', expecourmailController.expecourmail_request)
// route to /request kartu nama
app.get('/request/kartunama', kartunamaController.page)
app.post('/kartunama-request', kartunamaController.kartunama_request)
// route get to /request konsumsi
app.get('/request/konsumsi', konsumsiController.konsumsi_jenis)
app.post('/konsumsi-paket', konsumsiController.konsumsi_paket)
app.post('/konsumsi-request', konsumsiController.konsumsi_request)
// app.post('/konsumsi-produk', konsumsiController.konsumsi_produk)

app.get('/requests')