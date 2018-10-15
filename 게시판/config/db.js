module.exports = function () {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'board'
    });
    con.connect();
    return con;
};