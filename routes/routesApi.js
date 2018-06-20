var express = require('express');
var router = express.Router();

var JoueurController = require("../controllers/JoueurController")
var PartieController = require('../controllers/PartieController')
var NaiosController = require('../controllers/NaiosController')
// api REST
router.get("/joueurs",JoueurController.getJoueur);
router.post('/joueur',JoueurController.addJoueur);
router.get('/naiosRest',NaiosController.naiosRest)


//BackOffice
router.get('*',function (req, res) {
    res.json({"message": "404 route not found "});
});

module.exports = router;