document.querySelector('#form-request').addEventListener('submit', () => {
    event.preventDefault();

    req_by = document.querySelector('#req_by').value
    req_for = document.querySelector('#req_for').value
    no_pekerja = document.querySelector('#no_pekerja').value
    nama_req = document.querySelector('#nama_req').value
    fungsi = document.querySelector('#fungsi').value
    perusahaan = document.querySelector('#perusahaan').value
    no_kontak = document.querySelector('#no_kontak').value
    email = document.querySelector('#email').value
    gedung = document.querySelector('#gedung').value
    desc_req = document.querySelector('#desc_req').value
    tgl_terima = document.querySelector('#tgl_terima').value
    lokasi_terima = document.querySelector('#lokasi_terima').value    

    fetch('/workfurn-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ticket':{
                'jenis_ticket': 'Workstation & Furniture',
                'req_by': req_by,
                'req_for': req_for,
                'no_pekerja': no_pekerja,
                'nama_req': nama_req,
                'fungsi': fungsi,
                'perusahaan': perusahaan,
                'no_kontak': no_kontak,
                'email': email,
                'gedung': gedung,
                'status': 'In Progress',
                'desc_req': desc_req,
            },
            'workfurn_ticket':{
                'tgl_terima': tgl_terima,
                'lokasi_terima': lokasi_terima,
                'item_workfurn': itemList
            }  
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})