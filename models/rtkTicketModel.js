const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// rtk schema dengan property
const rtkTicketSchema = new Schema({ // instance dari Schema
    tgl_terima: {type: Date, required: true},
    lokasi_terima: {type: String, required: true},
    sla: {type: Number, required: true},
    item_rtk: {type: Object, required: true},
}) // constructor untuk generate timestamp update

// model rtk untuk digunakan save, get, delete data
const rtkTicket = mongoose.model('RtkTicket', rtkTicketSchema) // model(nama_model, nama_schema)
module.exports = rtkTicket  // export modelnya