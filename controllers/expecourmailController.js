const _ = require('underscore');
const Ticket = require('../models/ticketModel');
const ExpecourmailTicket = require('../models/expecourmailTicketModel');

// menampilkan jenis expecourmail
const page = (req, res) => {
    res.render('expecourmail_request')
}

const expecourmail_request = (req, res) => {
    const expecourmail_ticket = new ExpecourmailTicket(req.body.expecourmail_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = expecourmail_ticket._id
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            expecourmail_ticket.save()
                .then((result) => {
                    res.json({ redirect: '/request/expecourmail' })
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
    page,
    expecourmail_request
}