const _ = require('underscore');
const Atk = require('../models/atkModel')
const Ticket = require('../models/ticketModel');
const AtkTicket = require('../models/atkTicketModel');

// menampilkan jenis atk
const atk_jenis = (req, res) => {
    Atk.find()
        .then((result) => {
            const jenis_atk = _.keys(_.countBy(result, function(result) { return result.jenis_produk; }))
            res.render('request_form/atk_request', { jenis_atk: jenis_atk.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}
// menampilkan produk dari jenis
const atk_produk = (req, res) => {
    const jenis = req.body.jenis
    Atk.find()
        .then((result) => {
            const produk = result.filter(item => item.jenis_produk == jenis)
            res.json({ produk })
        })
        .catch((error) => {
            console.log(error)
        })
}

const atk_request = (req, res) => {
    const atk_ticket = new AtkTicket(req.body.atk_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = atk_ticket._id
    
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            atk_ticket.save()
                .then((result) => {
                    res.json({ redirect: '/request/atk' })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    atk_jenis,
    atk_produk,
    atk_request
}