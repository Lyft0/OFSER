document.querySelectorAll('.activity-notes').forEach(element => {
    element.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            console.log('hel')
            let msg = element.value
            element.value = ""
    
            let tgl_now = new Date()
            let endpoint = `/my-request/${id_user}`
            fetch('/new_activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id_ticket': element.dataset.ticket,
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


})



