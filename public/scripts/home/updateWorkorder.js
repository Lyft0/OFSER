document.querySelector('#progress_sla').disabled = true

document.querySelector('#status').addEventListener('change', () => {
    let status = document.querySelector('#status').value
    if (status == 'In Progress') {
        document.querySelector('#progress_sla').style.display = "inline"
        document.querySelector('#date_sla').style.display = "inline"
    } else {
        document.querySelector('#progress_sla').style.display = "none"
        document.querySelector('#date_sla').style.display = "none"
    }

    let id_ticket = document.querySelector('#assignee').dataset.ticket
    let tgl_now = new Date()
    fetch('/set_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id_ticket': id_ticket,
            'status': status,
            'nama': cookies.nama,
            'tgl': tgl_now.toLocaleDateString(),
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})
if (document.querySelector('#status').value == 'In Progress') {
    document.querySelector('#progress_sla').style.display = "inline"
    document.querySelector('#date_sla').style.display = "inline"

    let date_now = new Date()
    let date_created = new Date(document.querySelector('#date_sla').dataset.created)
    let diff = (date_now - date_created) / (1000 * 60 * 60 * 24)
    diff = Math.round(diff)
    document.querySelector('#progress_sla').value = diff
} else {
    document.querySelector('#progress_sla').style.display = "none"
    document.querySelector('#date_sla').style.display = "none"
}

document.querySelector('#assignee').addEventListener('change', () => {
    let assignee = document.querySelector('#assignee').value
    let id_ticket = document.querySelector('#assignee').dataset.ticket
    let tgl_now = new Date()
    fetch('/assignee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id_ticket': id_ticket,
            'assignee': assignee,
            'nama': cookies.nama,
            'tgl': tgl_now.toLocaleDateString(),
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})

document.querySelector('#priority').addEventListener('change', () => {
    let priority = document.querySelector('#priority').value
    let id_ticket = document.querySelector('#assignee').dataset.ticket
    let tgl_now = new Date()
    fetch('/set_priority', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id_ticket': id_ticket,
            'priority': priority,
            'nama': cookies.nama,
            'tgl': tgl_now.toLocaleDateString(),
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})








var endpoint = 'ticket-workorder'

