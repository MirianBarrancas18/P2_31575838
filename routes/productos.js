var express = require('express');
var router = express.Router();

// Ruta para la página de contacto
router.get('/', function (req, res, next) {
    res.render('productos', { title: 'productos' });
});

module.exports = router;