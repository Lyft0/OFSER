// import module
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
// import controller
const eventSuppController = require('./controllers/eventSuppController')
const consumController = require('./controllers/consumController')
const konsumsiController = require('./controllers/konsumsiController')
const workfurnController = require('./controllers/workfurnController')
const rtkController = require('./controllers/rtkController')
const expecourmailController = require('./controllers/expecourmailController')
const kartunamaController = require('./controllers/kartunamaController')
const userController = require('./controllers/userController')
const ticketController = require('./controllers/ticketController')
// import routes
const atkRoute = require('./routes/atkRoute')


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
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
      },
    })
  );
app.use(cookieparser());

// routes
// route to /request ATK
app.use(atkRoute)
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

// login page
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login-user', userController.user_login)
app.get('/home-req', (req, res) => {
    res.render('home_requester')
})
app.get('/home-ful', (req, res) => {
    res.render('home_fulfiller')
})
// requester page
app.get('/my-request/:id', userController.my_request)
// delete ticket
app.delete('/delete-ticket/:user/:id', ticketController.delete_ticket)
// get ticket detail
app.post('/ticket-print', ticketController.print_ticket)

// ticket-console page
app.get('/ticket-console', userController.all_ticket)
// one ticket request and work order
app.get('/ticket-request/:id', ticketController.ticket_request)
app.get('/ticket-workorder/:id', ticketController.ticket_workorder)

app.post('/assignee', ticketController.user_assignee)
app.post('/set_status', ticketController.set_status)
app.post('/new_activity', ticketController.new_activity)

