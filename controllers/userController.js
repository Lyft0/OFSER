const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

const user_login = (req, res) => {
    User.find({
        email: req.body.email,
        password: req.body.password,
    })
        .then((result) => {
            if(result[0]){
                res.cookie('user', result[0])
                if(result[0].role == 'fulfiller'){
                    res.json({ redirect: '/home-ful' })
                }else{
                    res.json({ redirect: '/home-req' })
                }
            }else{
                console.log('user not exist')
            }
        })
}

const my_request = (req, res) => {
    Ticket.find({ id_user_req: req.params.id }).sort({ createdAt: -1 })
        .then((result) => {
            res.render('my-request', { ticket: result })
        })
}

const all_ticket = (req, res) => {
    Ticket.find()
        .then((result) => {
            res.render('ticket_console', { ticket: result })
        })
}

module.exports = {
    user_login,
    my_request,
    all_ticket,
}