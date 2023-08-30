const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// atk schema dengan property
const atkSchema = new Schema({ // instance dari Schema
    nama_produk: {type: String, required: true},
    jenis_produk: {type: String, required: true},
    jumlah: {type: Number, required: true}
}) // constructor untuk generate timestamp update

// model atk untuk digunakan save, get, delete data
const Atk = mongoose.model('Atk', atkSchema) // model(nama_model, nama_schema)
module.exports = Atk  // export modelnya
