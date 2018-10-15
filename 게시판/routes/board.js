'use strict';
var express = require('express');
var router = express.Router();
var con = require('../config/db')();

var boardPaging = require('../js/boardPaging');

router.get('/write', function (req, res) {
    res.render('write');
});

router.post('/write', function (req, res) {
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var sql = 'insert into board(_name, _title, _content) values(?,?,?)';
    con.query(sql, [name, title, content], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/board/' + result.insertId);
        }
    });
});

router.get('/:id/modify', function (req, res) {
    var id = req.params.id;
    var sql = 'select * from board where _id = ?';
    con.query(sql, [id], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('internal Server Error');
        }
        res.render('modify_view', { topics: result });
    });
    
});
router.post('/:id/modify', function (req, res) {
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var id = req.params.id;
    var sql = 'update board set _title = ?, _content= ? where _id = ?';
    con.query(sql, [title,content,id], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/board/'+id);
        }
    });
});

router.get('/', function (req, res) {
    var sql = 'select _id, _title, _name, _date, _hit from board order by _id desc limit ?,?';
    var curPage=1;
    if (req.query.page)
        curPage = req.query.page;
    con.query('select count(*) as count from board', function (err, result2, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('internal Server Error');
        }
        var page = boardPaging(curPage, result2[0].count, 2, 2);
        con.query(sql, [2 * (curPage-1), 2], function (err, result, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('internal Server Error');
            }
            res.render('board', { topics: result, page: page });
        });
    });
});



router.get('/:id', function (req, res) {
    var id = req.params.id;
    var sql = 'update board set _hit=_hit+1 where _id = ?'
    con.query(sql, [id], function (err, result, fields) {
        var sql = 'select * from board where _id = ?';
        if (err) {
            console.log(err);
            res.status(500).send('internal Server Error');
        }
        con.query(sql, [id], function (err, result, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('internal Server Error');
            }
            res.render('content_view', { topics: result });
        });
    });
});

module.exports = router;