const _ = require('underscore');
const Rtk = require('../models/rtkModel')
const Ticket = require('../models/ticketModel');
const RtkTicket = require('../models/rtkTicketModel');

// menampilkan jenis rtk
const rtk_jenis = (req, res) => {
    Rtk.find()
        .then((result) => {
            const jenis_produk = result.map(item => item.jenis_produk)
            res.render('request_form/rtk_request', { jenis_produk: jenis_produk.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}

const rtk_request = (req, res) => {
    const rtk_ticket = new RtkTicket(req.body.rtk_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = rtk_ticket._id
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            rtk_ticket.save()
                .then((result) => {
                    res.json({ redirect: '/request/rtk' })
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
    rtk_jenis,
    rtk_request,
}