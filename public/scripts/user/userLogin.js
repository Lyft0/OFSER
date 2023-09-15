document.getElementById('login').addEventListener('submit', (event) => {
    event.preventDefault()
    fetch('/login-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': document.getElementById('email').value,
            'password': document.getElementById('password').value,
        })
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect)
    .catch((err) => {
        console.log(err)
    })
})