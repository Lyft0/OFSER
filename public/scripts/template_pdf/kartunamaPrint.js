const { jsPDF } = require("jspdf")
require('jspdf-autotable')

const kartunamaPrint = (ticket, ticket_detail) => {    
    var doc = new jsPDF()

    doc.setFont("helvetica", "bold");
    doc.text("PERMINTAAN LAYANAN", 20, 20);
    doc.text(`OFFICE FACILITY SUPPORT - ${ticket.jenis_ticket.toUpperCase()}`, 20, 27);

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal");
    doc.text(`Request ID: ${ticket.request_id}`, 20, 40);
    doc.text(`${Date(Date.now).slice(4, -34)}`, 190, 45, null, null, "right");
    doc.text("Requester:", 20, 53)
    doc.text(`${ticket.nama_req} / ${ticket.no_pekerja}`, 22, 59)
    doc.text(`${ticket.fungsi}`, 22, 65)
    doc.text(`${ticket.no_kontak} / ${ticket.email}`, 22, 71)
    doc.text(`${ticket.perusahaan} / ${ticket.gedung}`, 22, 77)
    doc.text("Deskripsi Singkat", 20, 90)
    doc.text(`: ${ticket.desc_req}`, 80, 90)
    doc.text("Tanggal Penerimaan", 20, 96)
    doc.text(`: ${ticket_detail.tgl_terima.toUTCString().slice(5, -13)}`, 80, 96)
    doc.text("Lokasi Penerimaan", 20, 102)
    doc.text(`: ${ticket_detail.lokasi_terima}`, 80, 102)
    doc.text("Nomor Pekerja", 20, 108)
    doc.text(`: ${ticket_detail.no_pekerja_kartu}`, 80, 108)
    doc.text("Nama Pekerja", 20, 114)
    doc.text(`: ${ticket_detail.nama_pekerja}`, 80, 114)
    doc.text("Jabatan", 20, 120)
    doc.text(`: ${ticket_detail.jabatan}`, 80, 120)
    doc.text("Fungsi", 20, 126)
    doc.text(`: ${ticket_detail.fungsi_kartu}`, 80, 126)
    doc.text("Direktorat", 20, 132)
    doc.text(`: ${ticket_detail.direktorat}`, 80, 132)
    doc.text("Alamat Kantor", 20, 138)
    doc.text(`: ${ticket_detail.alamat_kantor}`, 80, 138)
    doc.text("Deskripsi Tambahan", 20, 144)
    doc.text(`: ${ticket_detail.desc_tambah}`, 80, 144)
    doc.text('Yang Meminta / Pengguna', 188, 245, null, null, 'right');
    doc.text('(                                         )', 190, 280, null, null, 'right');

    return doc
}
    
module.exports = {
    kartunamaPrint
}