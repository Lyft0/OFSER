const express = require('express');
const app = express();
const PORT = 3000;

// Data produk berdasarkan jenis
const productsByType = {
  elektronik: ['Laptop', 'Smartphone', 'TV'],
  pakaian: ['Kemeja', 'Celana', 'Jaket'],
  makanan: ['Snack', 'Minuman', 'Makanan Ringan'],
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/getProducts', (req, res) => {
  const selectedType = req.body.selectedType;
  const products = productsByType[selectedType] || [];
  res.json({ products });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/test', (req, res) => {
    console.log(req.body)
})

