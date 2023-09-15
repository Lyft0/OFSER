const { jsPDF } = require("jspdf")
require('jspdf-autotable')

const expecourmailPrint = (ticket, ticket_detail) => {    
    var doc = new jsPDF()

    doc.setFont("helvetica", "bold");
    doc.text("PERMINTAAN LAYANAN OFFICE FACILITY SUPPORT -", 20, 20);
    doc.text(`${ticket.jenis_ticket.toUpperCase()}`, 20, 27);

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
    doc.text("Jenis Pengiriman", 20, 96)
    doc.text(`: ${ticket_detail.jenis_kirim}`, 80, 96)
    doc.text("Tanggal Pengiriman", 20, 102)
    doc.text(`: ${ticket_detail.tgl_kirim.toUTCString().slice(5, -13)} ${ticket_detail.jam_kirim}`, 80, 102)
    doc.text("Nama Pengirim", 20, 108)
    doc.text(`: ${ticket_detail.nama_kirim}`, 80, 108)
    doc.text("Lokasi Pengirim", 20, 114)
    doc.text(`: ${ticket_detail.lokasi_kirim}`, 80, 114)
    doc.text("Nama Penerima", 20, 120)
    doc.text(`: ${ticket_detail.nama_terima}`, 80, 120)
    doc.text("Lokasi Penerima", 20, 126)
    doc.text(`: ${ticket_detail.lokasi_terima}`, 80, 126)
    doc.text("No. Hp/Ext Penerima", 20, 132)
    doc.text(`: ${ticket_detail.kontak_terima}`, 80, 132)
    doc.text("Jenis", 20, 138)
    doc.text(`: ${ticket_detail.jenis_barang.toString()}`, 80, 138)
    doc.text("Jumlah Barang / Dokumen", 20, 144)
    doc.text(`: ${ticket_detail.jumlah}`, 80, 144)
    doc.text("Deskripsi", 20, 150)
    doc.text(`: ${ticket_detail.desc_barang}`, 80, 150)
    doc.text('Yang Meminta / Pengguna', 188, 245, null, null, 'right');
    doc.text('(                                         )', 190, 280, null, null, 'right');

    return doc
}
    
module.exports = {
    expecourmailPrint
}