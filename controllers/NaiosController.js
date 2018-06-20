var db = require('../confDB')
var formidable = require('formidable')
var fs = require('fs')
var Naios = require('../Models/Naios')

var jsonResp = function(res, state, body){
    res.status(state);
    res.json(body);
}

module.exports.addNaios = function (req, res) {
    if(req.session.erreurInput){
        res.locals.erreurInput = req.session.erreurInput;
        req.session.erreurInput = undefined;
    }
    res.render('addNaios')
}
module.exports.addNewNaios = (req, res )=>{
        if(req.url == '/addNewNaios'){
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
               if(fields.nom && fields.desc){
                   db.query('SELECT * FROM naios where nom = ?', [fields.nom], function (err, result) {
                      if(err) throw err;
                      if(!result[0]){
                          var oldpath = files.image._writeStream.path;
                          // dont forget the path f hebergement
                          var newpath = '/Users/mac/WebstormProjects/Game_of_Stone_Server/public/pic/' + fields.nom +'.'+files.image.name;
                          fs.rename(oldpath, newpath, function (err) {
                              if (err) throw err;
                              var sql ='INSERT INTO naios(nom, description, isChef, isMosquotte, image,lat,lon) VALUES (?,?,?,?,?,?,?)'
                              db.query(sql, [fields.nom,fields.desc,fields.isChef ? 1 :0 ,fields.isMosquotte ? 1:0, fields.nom +'.'+files.image.name,fields.lat,fields.lon],function (err) {
                                 if(err) throw err;
                                  // liste des naios ç!!!!!!!
                                  res.redirect('/admin/naios');
                              });
                          });
                      }else{
                          req.session.erreurInput = 'ce naios existe déja veuillez renseignez un nouveau naios svp  !'
                          res.redirect('/admin/addNaios');
                      }
                   });
               } else{
                   req.session.erreurInput = 'veuillez bien  renseignez  les champs svp !'
                   res.redirect('/admin/addNaios')
               }
            });
        }else
            res.redirect('admin/addNaios');

};

module.exports.getNaios = (req, res) => {
   Naios.getAll()
                .then(function (result) {
                    res.locals.naios = result;
                    res.render('naios')
                })
                .catch(function (err) {
                    res.locals.err = "time out erreur d'obtention de la liste des naios de la base de donnée ressayer plus tard"
                });

};

module.exports.naiosRest = (req,res) =>{
    Naios.getAll()
                .then(function (result) {
                    if(result)
                        jsonResp(res, 200, {
                            'naios': result,
                            'status' : 'success'
                        })
                })
                .catch(function (err) {
                    jsonResp(res, 400, {
                        'naios': "no naios",
                        'status' : 'faild'
                    })
                })
};
