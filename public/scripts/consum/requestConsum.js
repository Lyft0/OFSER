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

    tgl_terima = document.querySelector('#tgl_terima').value
    lokasi_terima = document.querySelector('#lokasi_terima').value

    let workorder_id = "WO" + Math.floor(1000 + Math.random() * 9000).toString()
    let tgl_now = new Date()
    let activity = []
    
    activity.push({
        'nama': 'System',
        'tgl': `${tgl_now.toLocaleDateString()}`,
        'msg': `New ${workorder_id} Generated.`
    })

    fetch('/consum-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ticket':{
                'jenis_ticket': 'Consumables',
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
            'consum_ticket':{
                'tgl_terima': tgl_terima,
                'lokasi_terima': lokasi_terima,
                'sla': 10,
                'item_consum': itemList
            }
            
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})