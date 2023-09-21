document.querySelector('#btn-logout').addEventListener('click', () => {
    fetch('/logout', {
        method: 'GET'
    })
    .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
    
})