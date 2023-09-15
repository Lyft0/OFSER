document.querySelector('#activity-note').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        let msg = document.querySelector('#activity-note').value
        document.querySelector('#activity-note').value = ""

        let tgl_now = new Date()
        fetch('/new_activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id_ticket': document.querySelector('#jenis_ticket').dataset.ticket,
                'nama': cookies.nama,
                'tgl': tgl_now.toLocaleDateString(),
                'msg': msg,
                'endpoint': endpoint,
            })
        })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
    }
})
