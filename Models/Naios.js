var db = require('../confDB')

module.exports.getAll = function () {
   return new Promise(function (resolve, reject) {
       var sql = 'SELECT * FROM naios '
       db.query(sql,function (err, result) {
           if(err)
               reject(err);
           else{
               if(result){
                   resolve(result);
               }else
                   resolve(0);
           }
       });
   });
}