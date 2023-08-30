const _ = require('underscore');
const Atk = require('../models/atkModel')

// menampilkan jenis atk
const atk_jenis = (req, res) => {
    Atk.find()
        .then((result) => {
            const jenis_atk = _.keys(_.countBy(result, function(result) { return result.jenis_produk; }))
            res.render('atk_request', { jenis_atk: jenis_atk.sort()}) // render file dengan view engine
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

module.exports = {
    atk_jenis,
    atk_produk
}