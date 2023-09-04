const jenisWorkfurn = document.getElementById('jenis_workfurn');
const listWorkfurn = document.getElementById('nama_workfurn');

jenisWorkfurn.addEventListener('change', () => {
    const selectedJenis = jenisWorkfurn.value;
    fetch('/workfurn-produk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `jenis=${selectedJenis}`,
    })
        .then((response) => response.json())
        .then((data) => {
            listWorkfurn.innerHTML = ''
            listWorkfurn.innerHTML = `<option value='' selected disabled hidden>Pilih Produk</option>`

            document.querySelector('#jumlah').value = 1

            if (Object.keys(data.produk).length == 0) {
                listWorkfurn.style.display = 'none'
                document.querySelector('#nama_workfurn_lainnya').style.display = 'inline'
            } else {
                listWorkfurn.style.display = 'inline'
                document.querySelector('#nama_workfurn_lainnya').style.display = 'none'
                document.querySelector('#nama_workfurn_lainnya').value = ''
                
                data.produk.forEach(produk => {
                    const option = document.createElement('option')
                    option.value = produk.nama_produk
                    option.textContent = produk.nama_produk
                    option.dataset.jumlah = produk.jumlah
                    listWorkfurn.appendChild(option)
                });
            }
        })
        .catch((err) => {
            console.log(err)
        })
});

listWorkfurn.addEventListener('change', () => {
    document.querySelector('#jumlah').max = listWorkfurn.options[listWorkfurn.selectedIndex].dataset.jumlah
})
