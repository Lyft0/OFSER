const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// konsumsi schema dengan property
const konsumsiTicketSchema = new Schema({ // instance dari Schema
    kegiatan: {type: String, required: true},                                      
    desc_kegiatan: {type: String, required: true},            
    tgl_mulai: {type: Date, required: true},         
    tgl_selesai: {type: Date, required: true},       
    jam_mulai: {type: String, required: true},        
    jam_selesai:{type: String, required: true},       
    lokasi_kegiatan:{type: String, required: true},             
    jumlah_hari: {type: Number, required: true},
    sla: {type: Number, required: true},
    item_konsumsi: {type: Object, required: true},        
}) // constructor untuk generate timestamp update

// model konsumsi untuk digunakan save, get, delete data
const konsumsiTicket = mongoose.model('konsumsiTicket', konsumsiTicketSchema) // model(nama_model, nama_schema)
module.exports = konsumsiTicket  // export modelnya