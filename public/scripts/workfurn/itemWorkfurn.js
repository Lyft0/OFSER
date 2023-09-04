let itemList = []

document.querySelector('#add-item').addEventListener('click', () => {
    const jenis = document.querySelector('#jenis_workfurn').value
    const jumlah = document.querySelector('#jumlah').value
    const deskripsi = document.querySelector('#desc_workfurn').value
    let nama = document.querySelector('#nama_workfurn').value

    if(document.querySelector('#nama_workfurn_lainnya').value != ""){
        nama = document.querySelector('#nama_workfurn_lainnya').value
    }
    if(nama != ''){
        itemList.push({
            'nama_produk':`${nama}`,
            'jenis_produk':`${jenis}`,
            'jumlah':`${jumlah}`,
            'deskripsi_produk':`${deskripsi}`,
        })
        console.log(itemList)

        var table = document.getElementById("item-list")
        var row = table.insertRow(-1)
        var nama_td = row.insertCell(0)
        var jenis_td = row.insertCell(1)
        var jumlah_td = row.insertCell(2)
        var deskripsi_td = row.insertCell(3)
        var delete_td = row.insertCell(4)
    
        nama_td.innerHTML = nama
        jenis_td.innerHTML = jenis
        jumlah_td.innerHTML = jumlah
        deskripsi_td.innerHTML = deskripsi
        delete_td.innerHTML = `<button type="button" class="delete_td">Delete</button>`
    }

    document.getElementById('jenis_workfurn').selectedIndex = 0
    listWorkfurn.innerHTML = ''
    listWorkfurn.innerHTML = `<option value='' selected disabled hidden>Pilih Produk</option>`
    document.getElementById('jumlah').value = 1
    document.getElementById('desc_workfurn').value = ''

    if(listWorkfurn.value == "Lainnya"){
        document.querySelector('#nama_workfurn_lainnya').style.display = 'inline'
    }else{
        listWorkfurn.style.display = 'inline'
        document.querySelector('#nama_workfurn_lainnya').style.display = 'none'
        document.querySelector('#nama_workfurn_lainnya').value = ''
    }
})

document.querySelector('#item').addEventListener("click", function(event) {
    if (event.target.classList.contains("delete_td")) {
        const index = event.target.parentNode.parentNode.rowIndex;
        document.querySelector('#item').deleteRow(index)
        remove = itemList.splice(index-1, 1)
    }
})

