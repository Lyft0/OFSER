const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// konsumsi schema dengan property
const konsumsiSchema = new Schema({ // instance dari Schema
    nama_paket: {type: String, required: true},
    jenis_konsumsi: {type: String, required: true},
}) // constructor untuk generate timestamp update

// model konsumsi untuk digunakan save, get, delete data
const Konsumsi = mongoose.model('konsumsi', konsumsiSchema) // model(nama_model, nama_schema)
module.exports = Konsumsi  // export modelnya
