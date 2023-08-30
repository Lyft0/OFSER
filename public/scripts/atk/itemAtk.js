let itemList = []

document.querySelector('#add-item').addEventListener('click', () => {
    const jenis = document.querySelector('#jenis_atk').value
    const jumlah = document.querySelector('#jumlah').value
    const deskripsi = document.querySelector('#deskripsi_atk').value
    let nama = document.querySelector('#nama_atk').value

    if(document.querySelector('#nama_atk_lainnya').value != ""){
        nama = document.querySelector('#nama_atk_lainnya').value
    }
    if(nama != ''){
        itemList.push({
            'nama_produk':`${nama}`,
            'jenis_produk':`${jenis}`,
            'jumlah':`${jumlah}`,
            'deskripsi_produk':`${deskripsi}`,
        })
        
        var table = document.getElementById("item-list")
        var row = table.insertRow(-1)
        var nama_td = row.insertCell(0)
        var jenis_td = row.insertCell(1)
        var jumlah_td = row.insertCell(2)
        var deskripsi_td = row.insertCell(3)
        
        nama_td.innerHTML = nama
        jenis_td.innerHTML = jenis
        jumlah_td.innerHTML = jumlah
        deskripsi_td.innerHTML = deskripsi
    }

    document.getElementById('jenis_atk').selectedIndex = 0
    document.getElementById('nama_atk').selectedIndex = 0
    document.getElementById('jumlah').value = 1
    document.getElementById('deskripsi_atk').value = ''
})

