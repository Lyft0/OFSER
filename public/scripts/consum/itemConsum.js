let itemList = []

document.querySelector('#add-item').addEventListener('click', () => {
    const jumlah = document.querySelector('#jumlah').value
    const deskripsi = document.querySelector('#desc_produk').value
    let nama = document.querySelector('#nama_produk').value

    if(document.querySelector('#nama_produk_lainnya').value != ""){
        nama = document.querySelector('#nama_produk_lainnya').value
    }
    if(nama != ''){
        itemList.push({
            'nama_produk':`${nama}`,
            'jumlah':`${jumlah}`,
            'deskripsi_produk':`${deskripsi}`,
        })
        console.log(itemList)
        
        var table = document.getElementById("item-list")
        var row = table.insertRow(-1)
        var nama_td = row.insertCell(0)
        var jumlah_td = row.insertCell(1)
        var deskripsi_td = row.insertCell(2)
        var delete_td = row.insertCell(3)
    
        nama_td.innerHTML = nama
        jumlah_td.innerHTML = jumlah
        deskripsi_td.innerHTML = deskripsi
        delete_td.innerHTML = `<button type="button" class="delete_td">Delete</button>`
    }

    document.getElementById('nama_produk').selectedIndex = 0
    document.getElementById('jumlah').value = 1
    document.getElementById('desc_produk').value = ''
    document.querySelector('#nama_produk_lainnya').style.display = 'none'
    document.querySelector('#nama_produk_lainnya').value = ''
})

document.querySelector('#item').addEventListener("click", function(event) {
    if (event.target.classList.contains("delete_td")) {
        const index = event.target.parentNode.parentNode.rowIndex;
        document.querySelector('#item').deleteRow(index)
        remove = itemList.splice(index-1, 1)
    }
})

const listItem = document.getElementById('nama_produk');
listItem.addEventListener(('change'), () => {
    if(listItem.value == "Lainnya"){
        document.querySelector('#nama_produk_lainnya').style.display = 'inline'
    }else{
        listItem.style.display = 'inline'
        document.querySelector('#nama_produk_lainnya').style.display = 'none'
        document.querySelector('#nama_produk_lainnya').value = ''
    }
})
