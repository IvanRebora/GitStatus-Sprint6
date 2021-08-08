const express = require('express');
const router = express.Router();
const categoryApiController = require("../../controller/api/categoryApiController");

// Rutas
// Listado de todas las categories en la db
router.get('/', categoryApiController.list);

module.exports = router;