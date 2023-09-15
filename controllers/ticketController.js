// import model
const Ticket = require('../models/ticketModel')
const atkTicketModel = require('../models/atkTicketModel')
const consumTicketModel = require('../models/consumTicketModel')
const eventSuppTicketModel = require('../models/eventSuppTicketModel')
const expecourmailTicketModel = require('../models/expecourmailTicketModel')
const kartunamaTicketModel = require('../models/kartunamaTicketModel')
const konsumsiTicketModel = require('../models/konsumsiTicketModel')
const rtkTicketModel = require('../models/rtkTicketModel')
const workfurnTicketModel = require('../models/workfurnTicketModel')
const User = require('../models/userModel')

const { atkPrint } = require('../public/scripts/template_pdf/atkPrint')
const { consumPrint } = require('../public/scripts/template_pdf/consumPrint')
const { eventsuppPrint } = require('../public/scripts/template_pdf/eventsuppPrint')
const { expecourmailPrint } = require('../public/scripts/template_pdf/expecourmailPrint')
const { kartunamaPrint } = require('../public/scripts/template_pdf/kartunamaPrint')
const { konsumsiPrint } = require('../public/scripts/template_pdf/konsumsiPrint')
const { rtkPrint } = require('../public/scripts/template_pdf/rtkPrint')
const { workfurnPrint } = require('../public/scripts/template_pdf/workfurnPrint')

const delete_ticket = async (req, res) => {
    const id_user = req.params.user
    const id_ticket = req.params.id

    const ticket = await Ticket.findById(id_ticket)

    switch (ticket.jenis_ticket) {
        case "ATK":
            atkTicketModel.findByIdAndDelete(ticket.id_ticket_detail)
                .catch(err => console.log(err))
            break;
        case "Consumables":
            consumTicketModel.findByIdAndDelete(ticket.id_ticket_detail)
                .catch(err => console.log(err))
            break;
        case "Event Support":
            eventSuppTicketModel.findByIdAndDelete(ticket.id_ticket_detail)
                .catch(err => console.log(err))
            break;
        case "Expedition, Courier, & Mailing":
            expecourmailTicketModel.findByIdAndDelete(ticket.id_ticket_detail)
                .catch(err => console.log(err))
            break;
        case "Kartu Nama":
            kartunamaTicketModel.findByIdAndDelete(ticket.id_ticket_detail)
                .catch(err => console.log(err))
            break;
        case "Konsumsi":
            konsumsiTicketModel.findByIdAndDelete(ticket.id_ticket_detail)
                .catch(err => console.log(err))
            break;
        case "RTK":
            rtkTicketModel.findByIdAndDelete(ticket.id_ticket_detail)
                .catch(err => console.log(err))
            break;
        case "Workstation & Furniture":
            workfurnTicketModel.findByIdAndDelete(ticket.id_ticket_detail)
                .catch(err => console.log(err))
            break;
    }

    Ticket.findByIdAndDelete(id_ticket)
        .then(result => {
            res.json({ redirect: `/my-request/${id_user}` })
        })
        .catch((err) => {
            console.log(err)
        })
}

const print_ticket = async (req, res) => {
    const id_ticket = req.body.id_ticket

    const ticket = await Ticket.findById(id_ticket)
    let ticket_detail;
    let doc;

    switch (ticket.jenis_ticket) {
        case "ATK":
            ticket_detail = await atkTicketModel.findById(ticket.id_ticket_detail)
            doc = atkPrint(ticket, ticket_detail)
            break;
        case "Consumables":
            ticket_detail = await consumTicketModel.findById(ticket.id_ticket_detail)
            doc = consumPrint(ticket, ticket_detail)
            break;
        case "Event Support":
            ticket_detail = await eventSuppTicketModel.findById(ticket.id_ticket_detail)
            doc = eventsuppPrint(ticket, ticket_detail)
            break;
        case "Expedition, Courier, & Mailing":
            ticket_detail = await expecourmailTicketModel.findById(ticket.id_ticket_detail)
            doc = expecourmailPrint(ticket, ticket_detail)
            break;
        case "Kartu Nama":
            ticket_detail = await kartunamaTicketModel.findById(ticket.id_ticket_detail)
            doc = kartunamaPrint(ticket, ticket_detail)
            break;
        case "Konsumsi":
            ticket_detail = await konsumsiTicketModel.findById(ticket.id_ticket_detail)
            doc = konsumsiPrint(ticket, ticket_detail)
            break;
        case "RTK":
            ticket_detail = await rtkTicketModel.findById(ticket.id_ticket_detail)
            doc = rtkPrint(ticket, ticket_detail)
            break;
        case "Workstation & Furniture":
            ticket_detail = await workfurnTicketModel.findById(ticket.id_ticket_detail)
            doc = workfurnPrint(ticket, ticket_detail)
            break;
    }

    
    res.setHeader('Content-Disposition', 'attachment; filename="sample.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).send(doc.output())
}

const ticket_request = async (req, res) => {
    const id_ticket = req.params.id
    const ticket = await Ticket.findById(id_ticket)
    
    res.render('ticket_request', { ticket: ticket})
}

const ticket_workorder = async (req, res) => {
    const id_ticket = req.params.id
    const ticket = await Ticket.findById(id_ticket)
    
    let ticket_detail;
    switch (ticket.jenis_ticket) {
        case "ATK":
            ticket_detail = await atkTicketModel.findById(ticket.id_ticket_detail)
            break;
        case "Consumables":
            ticket_detail = await consumTicketModel.findById(ticket.id_ticket_detail)
            break;
        case "Event Support":
            ticket_detail = await eventSuppTicketModel.findById(ticket.id_ticket_detail)
            break;
        case "Expedition, Courier, & Mailing":
            ticket_detail = await expecourmailTicketModel.findById(ticket.id_ticket_detail)
            break;
        case "Kartu Nama":
            ticket_detail = await kartunamaTicketModel.findById(ticket.id_ticket_detail)
            break;
        case "Konsumsi":
            ticket_detail = await konsumsiTicketModel.findById(ticket.id_ticket_detail)
            break;
        case "RTK":
            ticket_detail = await rtkTicketModel.findById(ticket.id_ticket_detail)
            break;
        case "Workstation & Furniture":
            ticket_detail = await workfurnTicketModel.findById(ticket.id_ticket_detail)
            break;
    }
    const user_fulfiller = await User.find({ role: "fulfiller" },{ nama:1, _id:0 })
    res.render('ticket_workorder', { ticket: ticket, ticket_detail: ticket_detail, fulfiller: user_fulfiller})
}

const user_assignee = async (req, res) => {
    Ticket.findByIdAndUpdate(req.body.id_ticket, { assignee: req.body.assignee })
    .then((result) => {
        res.json({ redirect: `/ticket-workorder/${req.body.id_ticket}` })
    })
    .catch((err) => {
        console.log(err)
    })
}

const set_status = async (req, res) => {
    Ticket.findByIdAndUpdate(req.body.id_ticket, { status: req.body.status })
    .then((result) => {
        res.json({ redirect: `/ticket-workorder/${req.body.id_ticket}`})
    })
    .catch((err) => {
        console.log(err)
    })
}

const new_activity = async (req, res) => {
    let activity = {
        'nama':req.body.nama,
        'tgl':req.body.tgl,
        'msg':req.body.msg,
    }
    let activity_old = await Ticket.findById(req.body.id_ticket,{ activity:1, _id:0 })
    activity_old = activity_old.activity
    activity_old.unshift(activity)
    
    Ticket.findByIdAndUpdate(req.body.id_ticket, { activity: activity_old })
    .then((result) => {
        res.json({ redirect: `/${req.body.endpoint}/${req.body.id_ticket}`})
    })
    .catch((err) => {
        console.log(err)
    })
    
}

module.exports = {
    delete_ticket,
    print_ticket,
    ticket_request,
    ticket_workorder,
    user_assignee,
    set_status,
    new_activity,
}

