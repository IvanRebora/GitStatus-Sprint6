const express = require('express');

const router = express.Router();

const multer = require('multer');
const path = require('path');
const controller = require('../controller/productController');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});



const upload = multer({ storage });




router.get('/', controller.list)
router.get('/cart', controller.cart)
router.get('/:id', controller.detail)
router.get('/create', controller.add)
router.post('/create', upload.single('image'), controller.create)
router.get('/edit/:id', controller.edit)
router.put('/edit/:id', upload.single('image'), controller.update)
router.delete('/delete/:id', controller.delete)
router.get('/search', controller.search)

module.exports = router;