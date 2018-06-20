var db = require('../confDB');
var PartieController = require('./PartieController')

var jsonResp = function(res, state, body){
    res.status(state);
    res.json(body);
}
module.exports.getJoueur = function (req, res) {
    res.json("malika");
}

//--
module.exports.addJoueur = function (req, res) {
    if(req.body){
        PartieController.getLastAccessCode().then(function (code) {
            //console.log("ha code",code, req.body.password);
            if(code.code == req.body.password){
                //
                var sql = 'SELECT * FROM joueurs where email = ?';
                db.query(sql, [req.body.email],function (err, result) {
                    console.log('hana abana', result)
                    if(err)
                        throw err;
                    if(result.length > 0)
                        jsonResp(res, 200, {
                            'status': 'success',
                            'joueur' : result[0],
                            'infos' :    "exist already",
                            'accessCode' : true,
                            'controle': code.controle
                        });
                    else{
                        sql = "INSERT INTO joueurs (firstName, name, age, email) VALUES (?,?,?,?) ";
                        db.query(sql, [req.body.firstName, req.body.name, req.body.age, req.body.email],function (err, result) {
                            if(err)
                                throw err;
                            jsonResp(res, 200, {
                                'status': 'success',
                                'joueur' : {'firstName': req.body.firstName,
                                    'name' :  req.body.name,
                                    'age' : req.body.age,
                                    'email' : req.body.email},
                                'infos' : 'new one',
                                'accessCode': true,
                                'controle': code.controle
                            });
                        });
                    }

                });
                //----
            }else{
                jsonResp(res,200, {
                    'status': 'faild',
                    'accessCode' : false
                })
            }

        }).catch(function (err) {
            jsonResp(res,400,{
                'status' : 'faild',
                'err' : err
            }) ;
        });

    }else
        jsonResp(res, 401, {
           'status' : "faild",
           'joueur' : 'manque body'
        });
}