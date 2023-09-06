const User = require('../models/userModel')

const user_login = (req, res) => {
    User.find({
        email: req.body.email,
        password: req.body.password,
    })
        .then((result) => {
            if(result[0]){
                if(result[0].role == '1'){
                    res.json({ redirect: '/home-ful' })
                }else{
                    res.json({ redirect: '/home-req' })
                }
            }else{
                console.log('user not exist')
            }
        })
}

module.exports = {
    user_login,
}