const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// workfurn schema dengan property
const workfurnTicketSchema = new Schema({ // instance dari Schema
    tgl_terima: {type: Date, required: true},
    lokasi_terima: {type: String, required: true},
    item_workfurn: {type: Object, required: true},
}) // constructor untuk generate timestamp update

// model workfurn untuk digunakan save, get, delete data
const WorkfurnTicket = mongoose.model('WorkfurnTicket', workfurnTicketSchema) // model(nama_model, nama_schema)
module.exports = WorkfurnTicket  // export modelnya