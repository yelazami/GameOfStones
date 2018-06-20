var db = require('../confDB');
var Naios = require('../Models/Naios')

var jsonResp = function(res, state, body){
    res.status(state);
    res.json(body);
}
module.exports.getLastAccessCode = function() {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT code, controle from accesscode order by date desc limit 1';
        db.query(sql,function (err, result) {
            if(err)
                reject();
            if(result && result[0]){
                console.log(result[0].controle);
                resolve(result[0])
            }
            else
                resolve(0);
        });
    })
};
module.exports.getNaios = function(){
    let sql = "SELECT * FROM naios"
    db.query(sql, function (err, result) {

    });
}

module.exports.getIndex = (req, res)=>{
    if(req.session.code && req.session.controle){
        res.locals.code = req.session.code;
        res.locals.controle = req.session.controle;
        req.session.code = undefined;
        req.session.controle = undefined;
    }
    else{
        var code = this.getLastAccessCode().then(function (result) {
            if(result.code == 0)
                res.locals.code = "Vous avez pas encore génerer un code d'accès !"
            else{
                console.log("hana", result.code, result.controle);
                res.locals.code = result.code;
                res.locals.controle = result.controle;
            }
        }).catch(function (err) {
            res.status(400);
            res.send(err);
        })
    }
    Naios
        .getAll()
        .then(function (naios) {
            res.locals.naios = naios;
            res.render('index')
        }).catch(function (err) {
            res.locals.err = "erreur de la base de donnée (récupération de la liste des naios)"
        })

   
}

module.exports.generateAccessCode = function (req, res) {
    var nb = Math.floor((Math.random() * 100000000) + 1);
    if(nb < 10000000){
        nb*=10
    }else if(nb > 99999999){
        nb/=10
    }
    var controle = Math.floor((Math.random() * 10000) + 1);
    if(controle < 1000){
        controle*=10;
    }
    else if(controle > 9999){
        controle/=10;
    }
    console.log("controle ", controle);
    var del = 'TRUNCATE TABLE accesscode'
    db.query(del,function (err, result) {
        var sql = 'INSERT INTO `accesscode` (`id`, `code`,`controle` ,`date`) VALUES (NULL, ? , ? ,CURRENT_TIMESTAMP)';
        db.query(sql, [nb, controle], function (err, result) {
            if(err)
                throw err;
            else{
                req.session.code = nb;
                req.session.controle = controle;
                res.redirect('/admin/index');
            }

        })
    });

}