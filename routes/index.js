var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "Peluquería Versalles - Inicio",
    ogTitle: "Peluquería Versalles",
    ogDescription: "¡Haz tu reserva en la mejor peluquería! Cortes, tratamientos, y más.",
  });
});



module.exports = router;
