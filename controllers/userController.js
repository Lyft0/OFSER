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

const get_requester = (req, res) => {
    User.find({},{ nama:1, _id:0})
        .then((result) => {
            res.json({ requester: result })
        })
}

const all_ticket = (req, res) => {
    Ticket.find()
        .then((result) => {
            res.render('ticket_console', { ticket: result })
        })
}

const profile = async (req, res) => {
    const id_user = req.params.id

    const user = await User.findById(id_user)
    res.render('profile', { user: user })
}

const update = async (req, res) => {
    const user_update = await User.findByIdAndUpdate({_id: req.body.id_user}, {
        ...req.body
    })
    if(req.files){
        const { img } = req.files;
        let img_name = req.body.nama + ".png"
        img.mv(__dirname + '/../public/images/profile/' + img_name);
        const user_img = await User.findByIdAndUpdate({_id: req.body.id_user}, { image: img_name })
    }
    const user = await User.findByIdAndUpdate({_id: req.body.id_user})

    res.clearCookie('user');
    res.cookie('user', await User.findById(req.body.id_user))
    res.render('profile', { user: user })
}

const logout = (req, res) => {
    res.clearCookie('user');
    res.json({ redirect: '/login' })
}

module.exports = {
    user_login,
    my_request,
    get_requester,
    all_ticket,
    profile,
    update,
    logout,
}