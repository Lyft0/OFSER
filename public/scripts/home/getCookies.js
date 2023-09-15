let cookies = decodeURIComponent(document.cookie.slice(9))
cookies = JSON.parse(cookies)
document.querySelector('#user-name').textContent = cookies.nama
document.querySelector('#my-request').href = "/my-request/" + cookies._id

let id_user = cookies._id
let nama = cookies.nama
let email = cookies.email