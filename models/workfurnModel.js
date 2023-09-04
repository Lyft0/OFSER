const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// workfurn schema dengan property
const workfurnSchema = new Schema({ // instance dari Schema
    nama_produk: {type: String, required: true},
    jenis_produk: {type: String, required: true},
    jumlah: {type: Number, required: true}
}) // constructor untuk generate timestamp update

// model workfurn untuk digunakan save, get, delete data
const Workfurn = mongoose.model('Workfurn', workfurnSchema) // model(nama_model, nama_schema)
module.exports = Workfurn  // export modelnya

