const _ = require('underscore');
const EventSupp = require('../models/eventSuppModel')
const Ticket = require('../models/ticketModel');
const EventSuppTicket = require('../models/eventSuppTicketModel');

// menampilkan jenis atk
const eventsupp_jenis = (req, res) => {
    EventSupp.find()
        .then((result) => {
            const nama_item = result.map(item => item.nama_item)
            res.render('eventsupp_request', { nama_item: nama_item.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}

const eventsupp_request = (req, res) => {
    const eventsupp_ticket = new EventSuppTicket(req.body.eventsupp_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = eventsupp_ticket._id
    
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            eventsupp_ticket.save()
                .then((result) => {
                    res.json({ redirect: '/request/eventsupp' })
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
    eventsupp_jenis,
    eventsupp_request,
}