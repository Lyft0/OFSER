const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// eventsupp schema dengan property
const eventSuppSchema = new Schema({ // instance dari Schema
    nama_item: {type: String, required: true},
})

// model eventsupp untuk digunakan save, get, delete data
const EventSupp = mongoose.model('eventsupp', eventSuppSchema) // model(nama_model, nama_schema)
module.exports = EventSupp  // export modelnya
