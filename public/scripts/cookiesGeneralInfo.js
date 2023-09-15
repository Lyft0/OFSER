let cookies = decodeURIComponent(document.cookie.slice(9))
cookies = JSON.parse(cookies)

document.querySelector('#req_by').value = cookies.nama
document.querySelector('#no_pekerja').value = cookies.no_pekerja
document.querySelector('#nama_req').value = cookies.nama
document.querySelector('#fungsi').value = cookies.fungsi
document.querySelector('#perusahaan').value = cookies.perusahaan
document.querySelector('#no_kontak').value = cookies.no_kontak
document.querySelector('#email').value = cookies.email
document.querySelector('#gedung').value = cookies.gedung
