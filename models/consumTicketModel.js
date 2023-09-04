const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// consum schema dengan property
const consumTicketSchema = new Schema({ // instance dari Schema
    tgl_terima: {type: Date, required: true},
    lokasi_terima: {type: String, required: true},
    item_consum: {type: Object, required: true},
}) // constructor untuk generate timestamp update

// model consum untuk digunakan save, get, delete data
const consumTicket = mongoose.model('consumTicket', consumTicketSchema) // model(nama_model, nama_schema)
module.exports = consumTicket  // export modelnya