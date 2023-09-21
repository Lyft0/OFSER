const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// user schema dengan property
const userSchema = new Schema({ // instance dari Schema
    email: {type: String, required: true},
    password: {type: String, required: true},
    no_pekerja: {type: String, required: true},
    nama: {type: String, required: true},
    fungsi: {type: String, required: true},
    perusahaan: {type: String, required: true},
    no_kontak: {type: String, required: true},
    gedung: {type: String, required: true},
    role: {type: String, required: true},
    image: {type: String, required: true},
}) // constructor untuk generate timestamp update

// model user untuk digunakan save, get, delete data
const user = mongoose.model('User', userSchema) // model(nama_model, nama_schema)
module.exports = user  // export modelnya