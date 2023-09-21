let cookies = decodeURIComponent(document.cookie.slice(9))
cookies = JSON.parse(cookies)

let id_user = cookies._id
let nama = cookies.nama
let email = cookies.email
let role = cookies.role

document.querySelector('#user-name').textContent = cookies.nama
document.querySelector('#my-request').href = "/my-request/" + cookies._id

