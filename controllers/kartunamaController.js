const _ = require('underscore');
const Ticket = require('../models/ticketModel');
const KartunamaTicket = require('../models/kartunamaTicketModel');

// menampilkan kartu nama page
const page = (req, res) => {
    res.render('kartunama_request')
}

const kartunama_request = (req, res) => {
    const kartunama_ticket = new KartunamaTicket(req.body.kartunama_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = kartunama_ticket._id
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            kartunama_ticket.save()
                .then((result) => {
                    res.json({ redirect: '/request/kartunama' })
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
    kartunama_request
}
