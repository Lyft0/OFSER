document.getElementById('form-request').addEventListener('submit', (event) => {
    event.preventDefault();
    for(i=0; i<hari; i++){
        jenis_konsum = document.getElementById(`jenis_konsum_${i}`).value
        paket_konsum = document.getElementById(`paket_konsum_${i}`).value
        jumlah = document.getElementById(`jumlah_${i}`).value
        itemList.push({
            'jenis_konsumsi':jenis_konsum,
            'paket_konsumsi':paket_konsum,
            'jumlah':jumlah
        })
    }
    console.log(itemList)

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

    kegiatan = document.querySelector('#kegiatan').value
    desc_kegiatan = document.querySelector('#desc_kegiatan').value    
    tgl_mulai = document.querySelector('#tgl_mulai').value    
    tgl_selesai = document.querySelector('#tgl_selesai').value    
    jam_mulai = document.querySelector('#jam_mulai').value    
    jam_selesai = document.querySelector('#jam_selesai').value    
    lokasi_kegiatan = document.querySelector('#lokasi_kegiatan').value    
    jumlah_hari = document.querySelector('#jumlah_hari').value

    let workorder_id = "WO" + Math.floor(1000 + Math.random() * 9000).toString()
    let tgl_now = new Date()
    let activity = []
    
    activity.push({
        'nama': 'System',
        'tgl': `${tgl_now.toLocaleDateString()}`,
        'msg': `New ${workorder_id} Generated.`
    })

    fetch('/konsumsi-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ticket':{
                'jenis_ticket': 'Konsumsi',
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
            'konsumsi_ticket':{
                'kegiatan': kegiatan,
                'desc_kegiatan': desc_kegiatan,    
                'tgl_mulai': tgl_mulai,    
                'tgl_selesai': tgl_selesai,    
                'jam_mulai': jam_mulai,    
                'jam_selesai': jam_selesai,    
                'lokasi_kegiatan': lokasi_kegiatan,   
                'jumlah_hari': jumlah_hari,
                'sla': 2,
                'item_konsumsi': itemList
            }
            
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })



})

