const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// atk schema dengan property
const atkTicketSchema = new Schema({ // instance dari Schema
    tgl_terima: {type: Date, required: true},
    lokasi_terima: {type: String, required: true},
    item_atk: {type: Object, required: true},
}) // constructor untuk generate timestamp update

// model atk untuk digunakan save, get, delete data
const AtkTicket = mongoose.model('AtkTicket', atkTicketSchema) // model(nama_model, nama_schema)
module.exports = AtkTicket  // export modelnya