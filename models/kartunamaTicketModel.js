const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// kartunama schema dengan property
const kartunamaTicketSchema = new Schema({ // instance dari Schema
    tgl_terima: {type: Date, required: true},
    lokasi_terima: {type: String, required: true},
    no_pekerja_kartu: {type: String, required: true},
    nama_pekerja: {type: String, required: true},
    jabatan: {type: String, required: true},
    fungsi_kartu: {type: String, required: true},
    direktorat: {type: String, required: true},
    alamat_kantor: {type: String, required: true},
    desc_tambah: {type: String, required: true},
}) // constructor untuk generate timestamp update

// model kartunama untuk digunakan save, get, delete data
const kartunamaTicket = mongoose.model('kartunamaTicket', kartunamaTicketSchema) // model(nama_model, nama_schema)
module.exports = kartunamaTicket  // export modelnya