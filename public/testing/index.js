const { jsPDF } = window.jspdf;
const { autoTable } = window.jspdf;
var doc = new jsPDF();

doc.setFont("helvetica", "bold");
doc.text("PERMINTAAN LAYANAN", 20, 20);
doc.text("OFFICE FACILITY SUPPORT - ATK", 20, 27);

doc.setFontSize(11)
doc.setFont("helvetica", "normal");
doc.text("Request ID: REQ2446", 20, 40);
doc.text("27 Apr 2020 09:28:02", 200, 45, null, null, "right");
doc.text("Requester:", 20, 53)
doc.text("Lyft Lucifer/666", 22, 59)
doc.text("Shared Services Asset Management", 22, 65)
doc.text("08123456789 / lucifermorningstar@gmail.com", 22, 71)
doc.text("Pertamina (Persero) / Gedung Fastron", 22, 77)
doc.text("Deskripsi Singkat", 20, 90)
doc.text(": Lantai 4, ext 1234", 80, 90)
doc.text("Tanggal Penerimaan", 20, 96)
doc.text(": 29-04-2023 12:00:00", 80, 96)
doc.text("Lokasi Penerimaan", 20, 102)
doc.text(": HQ - GS AM - Office Facility Support", 80, 102)
doc.text("Tanggal & Jam Pick-up Ticket", 20, 108)
doc.text(": 23-04-2023 12:00:00", 80, 108)
doc.text("Ahmad Afdhal", 20, 114)
doc.text(": Lantai 4, ext 1234", 80, 114)
doc.text("DAFTAR PERMINTAAN", 20, 130)



// Define the table data (including the header)
var tableData = [
    ['Name', 'Age', 'Country'],
    ['John Doe', '30', 'USA'],
    ['Jane Smith', '25', 'Canada'],
];

// Define table column widths (optional)
var columnWidths = [60, 30, 40]; // Adjust as needed

// Add a table with a header to the PDF using autoTable
doc.autoTable({
    head: [tableData[0]], // Use the first row as the header
    body: tableData.slice(1), // Exclude the header from the body
    startY: 135, // Y-coordinate where the table should start
    columnStyles: {
        0: { cellWidth: columnWidths[0] },
        1: { cellWidth: columnWidths[1] },
        2: { cellWidth: columnWidths[2] },
        // Add more styles as needed
    },
    margin: {left: 20, right: 50}
})

doc.save('table_with_header.pdf');