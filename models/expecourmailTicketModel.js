const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// expecourmail schema dengan property
const expecourmailTicketSchema = new Schema({ // instance dari Schema
    jenis_kirim: {type: String, required: true},
    tgl_kirim: {type: Date, required: true},
    jam_kirim: {type: String, required: true},
    nama_kirim: {type: String, required: true},
    lokasi_kirim: {type: String, required: true},
    nama_terima: {type: String, required: true},
    lokasi_terima: {type: String, required: true},
    kontak_terima: {type: String, required: true},
    jenis_barang: {type: Object, required: true},
    jumlah: {type: Number, required: true},
    desc_barang: {type: String, required: true},
    sla: {type: Number, required: true},
}) // constructor untuk generate timestamp update

// model expecourmail untuk digunakan save, get, delete data
const expecourmailTicket = mongoose.model('expecourmailTicket', expecourmailTicketSchema) // model(nama_model, nama_schema)
module.exports = expecourmailTicket  // export modelnya