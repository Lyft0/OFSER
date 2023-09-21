const input_search = document.querySelector('#input-search')
const btn_search = document.querySelector('#btn-search')


btn_search.addEventListener('click', () => {
    search(input_search.value)
})
input_search.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        search(input_search.value)
    }
})

const search = (value) => {
    fetch('/get-ticket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'request_id': value })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
}

