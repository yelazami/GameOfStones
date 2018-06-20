
var mysql = require("mysql")

var con = mysql.createConnection({
    host: '192.168.64.2',
    user : "fontdouce",
    password : "0000",
    database : "game_of_stone"
})

con.connect(function (err) {
    if(err){
        console.error("erreur de connexion avec la base de donnée")
        throw err;
    }
    else
        console.log('connection success to db');
})


module.exports = con;