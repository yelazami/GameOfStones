var express = require('express');
var router = express.Router();

var JoueurController = require("../controllers/JoueurController")
var PartieController = require('../controllers/PartieController')
var NaiosController = require('../controllers/NaiosController')


router.get('/index', PartieController.getIndex)
router.get('/generateAccessCode',PartieController.generateAccessCode)
router.get('/addNaios',NaiosController.addNaios)
router.post('/addNewNaios',NaiosController.addNewNaios)
router.get('/naios',NaiosController.getNaios);

router.get('*',function (req, res) {
    res.json({"message": "404 route not found "});
});

module.exports = router;