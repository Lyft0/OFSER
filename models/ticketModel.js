const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// atk schema dengan property
const TicketSchema = new Schema({ // instance dari Schema
    jenis_ticket: {type: String, required: true},
    req_by: {type: String, required: true},
    req_for: {type: String, required: true},
    no_pekerja: {type: String, required: true},
    nama_req: {type: String, required: true},
    fungsi: {type: String, required: true},
    perusahaan: {type: String, required: true},
    no_kontak: {type: String, required: true},
    email: {type: String, required: true},
    gedung: {type: String, required: true},
    status: {type: String, required: true},
    desc_req: {type: String, required: true},
    id_user_req: {type: String, required: true},

    request_id: {type: String, required: false},
    workorder_id: {type: String, required: false},
    assignee: {type: String, required: false},
    priority: {type: String, required: false},
    progress_sla: {type: String, required: false},
    activity: {type: Object, required: false},

    id_ticket_detail: {type: String, required: true},
}, { timestamps: true}) // constructor untuk generate timestamp update

// model atk untuk digunakan save, get, delete data
const Ticket = mongoose.model('Ticket', TicketSchema) // model(nama_model, nama_schema)
module.exports = Ticket  // export modelnya
