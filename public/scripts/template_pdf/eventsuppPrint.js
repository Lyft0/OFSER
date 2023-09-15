const { jsPDF } = require("jspdf")
require('jspdf-autotable')

const eventsuppPrint = (ticket, ticket_detail) => {    
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
    doc.text("Tanggal Mulai", 20, 96)
    doc.text(`: ${ticket_detail.tgl_mulai.toUTCString().slice(5, -13)}`, 80, 96)
    doc.text("Tanggal Berakhir", 20, 102)
    doc.text(`: ${ticket_detail.tgl_selesai.toUTCString().slice(5, -13)}`, 80, 102)
    doc.text("Lokasi Kegiatan", 20, 108)
    doc.text(`: ${ticket_detail.lokasi_kegiatan}`, 80, 108)
    doc.text("Jumlah Peserta", 20, 114)
    doc.text(`: ${ticket_detail.jumlah_peserta}`, 80, 114)
    doc.text("DAFTAR PERMINTAAN", 20, 131)
    doc.text('Yang Meminta / Pengguna', 188, 245, null, null, 'right');
    doc.text('(                                         )', 190, 280, null, null, 'right');

    // Define the table data (including the header)
    var tableData = [
        ['No', 'Nama Produk', 'Jumlah', 'Deskripsi'],
    ];
    
    let i = 1
    ticket_detail.item_eventsupp.forEach(item => {
        let row = [i, item.nama_item, item.jumlah, item.deskripsi_produk]
        tableData.push(row)
        i += 1
    });

    // Define table column widths (optional)
    var columnWidths = [10, 50, 30, 60]; // Adjust as needed

    // Add a table with a header to the PDF using autoTable
    doc.autoTable({
        head: [tableData[0]], // Use the first row as the header
        body: tableData.slice(1), // Exclude the header from the body
        startY: 136, // Y-coordinate where the table should start
        columnStyles: {
            0: { cellWidth: columnWidths[0] },
            1: { cellWidth: columnWidths[1] },
            2: { cellWidth: columnWidths[2] },
            3: { cellWidth: columnWidths[3] },
        },
        margin: {left: 20, right: 50}
    })
    return doc
}
    
module.exports = {
    eventsuppPrint
}