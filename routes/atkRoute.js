const express = require('express')
const router = express.Router()
const atkController = require('../controllers/atkController')

router.get('/request/atk', atkController.atk_jenis)
router.post('/atk-produk', atkController.atk_produk)
router.post('/atk-request', atkController.atk_request)

module.exports = router