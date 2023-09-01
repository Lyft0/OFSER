const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// eventsupp schema dengan property
const eventsuppTicketSchema = new Schema({ // instance dari Schema
    jumlah_peserta: {type: Number, required: true},
    lokasi_kegiatan: {type: String, required: true},
    tgl_mulai: {type: Date, required: true},
    tgl_selesai: {type: Date, required: true},
    item_eventsupp: {type: Object, required: true},
}) // constructor untuk generate timestamp update

// model eventsupp untuk digunakan save, get, delete data
const eventSuppTicket = mongoose.model('eventSuppTicket', eventsuppTicketSchema) // model(nama_model, nama_schema)
module.exports = eventSuppTicket  // export modelnya