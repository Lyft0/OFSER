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
    let activity = {
        'nama':req.body.nama,
        'tgl':req.body.tgl,
        'msg':`${req.body.nama} assign ticket to ${req.body.assignee}`,
    }
    let activity_old = await Ticket.findById(req.body.id_ticket,{ activity:1, _id:0 })
    activity_old = activity_old.activity
    activity_old.unshift(activity)    
    let activity_update = await Ticket.findByIdAndUpdate(req.body.id_ticket, { activity: activity_old })

    Ticket.findByIdAndUpdate(req.body.id_ticket, { assignee: req.body.assignee })
    .then((result) => {
        res.json({ redirect: `/ticket-workorder/${req.body.id_ticket}` })
    })
    .catch((err) => {
        console.log(err)
    })
}

const set_status = async (req, res) => {
    let activity = {
        'nama':req.body.nama,
        'tgl':req.body.tgl,
        'msg':`Status change to ${req.body.status}`,
    }
    let activity_old = await Ticket.findById(req.body.id_ticket,{ activity:1, _id:0 })
    activity_old = activity_old.activity
    activity_old.unshift(activity)    
    let activity_update = await Ticket.findByIdAndUpdate(req.body.id_ticket, { activity: activity_old })

    Ticket.findByIdAndUpdate(req.body.id_ticket, { status: req.body.status })
    .then((result) => {
        res.json({ redirect: `/ticket-workorder/${req.body.id_ticket}`})
    })
    .catch((err) => {
        console.log(err)
    })
}

const set_priority = async (req, res) => {
    let activity = {
        'nama':req.body.nama,
        'tgl':req.body.tgl,
        'msg':`Priority change to ${req.body.priority}`,
    }
    let activity_old = await Ticket.findById(req.body.id_ticket,{ activity:1, _id:0 })
    activity_old = activity_old.activity
    activity_old.unshift(activity)    
    let activity_update = await Ticket.findByIdAndUpdate(req.body.id_ticket, { activity: activity_old })
    
    Ticket.findByIdAndUpdate(req.body.id_ticket, { priority: req.body.priority })
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
        if((req.body.endpoint).includes('/my-request')){
            res.json({ redirect: `${req.body.endpoint}`})
        }else{
            res.json({ redirect: `/${req.body.endpoint}/${req.body.id_ticket}`})
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

const get_ticket = async (req, res) => {
    const ticket = await Ticket.findOne({$or: [{request_id: req.body.request_id}, {workorder_id: req.body.request_id}]})

    let id_ticket = (ticket._id).toString()

    if((req.body.request_id).includes('WO')){
        res.json({ redirect: `/ticket-workorder/${id_ticket}`})    
    }else{
        res.json({ redirect: `/ticket-request/${id_ticket}`})
    }
}

const get_data = async (req, res) => {
    const nama = req.params.nama
    
    const my_ticket = await Ticket.find({assignee: nama}).count()
    const critical_ticket = await Ticket.find({priority: "Critical"}).count()
    const open_ticket = await Ticket.find({assignee: ""}).count()
    const all_ticket = await Ticket.find().count()
    const num_data = [my_ticket, critical_ticket, open_ticket, all_ticket]

    const atk_ticket = await atkTicketModel.find().count()
    const consum_ticket = await consumTicketModel.find().count()
    const eventsupp_ticket = await eventSuppTicketModel.find().count()
    const expecourmail_ticket = await expecourmailTicketModel.find().count()
    const kartunama_ticket = await kartunamaTicketModel.find().count()
    const konsumsi_ticket = await konsumsiTicketModel.find().count()
    const rtk_ticket = await rtkTicketModel.find().count()
    const workfurn_ticket = await workfurnTicketModel.find().count()
    const type_data = [atk_ticket, consum_ticket, eventsupp_ticket, expecourmail_ticket, kartunama_ticket, konsumsi_ticket, rtk_ticket, workfurn_ticket]

    const low_data = [
        await Ticket.find({priority: "Low", status: "Assigned"}).count(),
        await Ticket.find({priority: "Low", status: "In Progress"}).count(),
        await Ticket.find({priority: "Low", status: "Pending"}).count(),
    ]
    const medium_data = [
        await Ticket.find({priority: "Medium", status: "Assigned"}).count(),
        await Ticket.find({priority: "Medium", status: "In Progress"}).count(),
        await Ticket.find({priority: "Medium", status: "Pending"}).count(),
    ]
    const high_data = [
        await Ticket.find({priority: "High", status: "Assigned"}).count(),
        await Ticket.find({priority: "High", status: "In Progress"}).count(),
        await Ticket.find({priority: "High", status: "Pending"}).count(),
    ]
    const critical_data = [
        await Ticket.find({priority: "Critical", status: "Assigned"}).count(),
        await Ticket.find({priority: "Critical", status: "In Progress"}).count(),
        await Ticket.find({priority: "Critical", status: "Pending"}).count(),
    ]
    const status_data = [low_data, medium_data, high_data, critical_data]


    const date_data = await Ticket.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                    day: { $dayOfMonth: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                "_id.year": 1,   // Sort by year in ascending order
                "_id.month": 1,  // Then by month in ascending order
                "_id.day": 1     // Finally by day in ascending order
            }
        }
    ]);

    res.json({ num_data: num_data, type_data: type_data, status_data: status_data, date_data: date_data })
}


module.exports = {
    delete_ticket,
    print_ticket,
    ticket_request,
    ticket_workorder,
    user_assignee,
    set_status,
    set_priority,
    new_activity,
    get_ticket,
    get_data,
}

