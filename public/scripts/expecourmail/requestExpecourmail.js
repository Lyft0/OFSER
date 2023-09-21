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

    let cookies = decodeURIComponent(document.cookie.slice(9))
    cookies = JSON.parse(cookies)
    id_user_req = cookies._id

    jenis_kirim = (Array.from(document.getElementsByName("jenis_kirim")).find(radio => radio.checked)).value
    tgl_kirim = document.querySelector('#tgl_kirim').value
    jam_kirim = document.querySelector('#jam_kirim').value
    nama_kirim = document.querySelector('#nama_kirim').value
    lokasi_kirim = document.querySelector('#lokasi_kirim').value
    nama_terima = document.querySelector('#nama_terima').value
    lokasi_terima = document.querySelector('#lokasi_terima').value
    kontak_terima = document.querySelector('#kontak_terima').value
    
    let jenis_barang = []
    if(document.getElementById('barang').checked){
        jenis_barang.push(document.getElementById('barang').value)
    }
    if(document.getElementById('dokumen').checked){
        jenis_barang.push(document.getElementById('dokumen').value)
    }
    if(document.getElementById('lainnya').checked){
        jenis_barang.push(document.getElementById('lainnya').value)
    }

    jumlah = document.querySelector('#jumlah').value
    desc_barang = document.querySelector('#desc_barang').value
    
    let workorder_id = "WO" + Math.floor(1000 + Math.random() * 9000).toString()
    let tgl_now = new Date()
    let activity = []
    
    activity.push({
        'nama': 'System',
        'tgl': `${tgl_now.toLocaleDateString()}`,
        'msg': `New ${workorder_id} Generated.`
    })

    fetch('/expecourmail-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ticket':{
                'jenis_ticket': 'Expedition, Courier, & Mailing',
                'req_by': req_by,
                'req_for': req_for,
                'no_pekerja': no_pekerja,
                'nama_req': nama_req,
                'fungsi': fungsi,
                'perusahaan': perusahaan,
                'no_kontak': no_kontak,
                'email': email,
                'gedung': gedung,
                'status': 'Waiting Approval',
                'desc_req': desc_req,
                'id_user_req': id_user_req,
                'request_id': "REQ" + Math.floor(1000 + Math.random() * 9000).toString(),
                'workorder_id': workorder_id,
                'assignee': '',
                'priority': 'Not Set',
                'progress_sla': '',
                'activity': activity,
            },
            'expecourmail_ticket':{
                'jenis_kirim': jenis_kirim,
                'tgl_kirim': tgl_kirim,
                'jam_kirim': jam_kirim,
                'nama_kirim': nama_kirim,
                'lokasi_kirim': lokasi_kirim,
                'nama_terima': nama_terima,
                'lokasi_terima': lokasi_terima,
                'kontak_terima': kontak_terima,
                'jenis_barang': jenis_barang,
                'jumlah': jumlah,
                'desc_barang': desc_barang,
                'sla': 10,
            }
            
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})