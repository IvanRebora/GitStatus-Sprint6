const express = require('express');
const router = express.Router();
const categoryApiController = require('../../controller/api/categoryApiController');

//Rutas
//Listado de marcas
router.get('/', categoryApiController.list);
//Cantidad de marcas
router.get('/count', categoryApiController.count);
//Detalle de una marca
router.get('/:id', categoryApiController.detail);



module.exports = router;