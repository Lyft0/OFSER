document.querySelector('#form-request').addEventListener('submit', () => {
    event.preventDefault();
    console.log('hell')
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

    jumlah_peserta = document.querySelector('#jumlah_peserta').value
    lokasi_kegiatan = document.querySelector('#lokasi_kegiatan').value
    tgl_mulai = document.querySelector('#tgl_mulai').value
    tgl_selesai = document.querySelector('#tgl_selesai').value    

    fetch('/eventsupp-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ticket':{
                'jenis_ticket': 'Event Support',
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
            'eventsupp_ticket':{
                'jumlah_peserta': jumlah_peserta,
                'lokasi_kegiatan': lokasi_kegiatan,
                'tgl_mulai': tgl_mulai,
                'tgl_selesai': tgl_selesai,
                'item_eventsupp': itemList
            }
            
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})