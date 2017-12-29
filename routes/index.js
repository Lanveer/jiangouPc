var express = require('express');
var router = express.Router();
const Config = require('../config/config');
const Mysql= require('../config/mysql');

function search(sql,callback) {
    Mysql.master.getConnection(function (err,connection) {
        if(err) return callback(err);
        connection.query(sql,function (err,result) {
            connection.release();
            if(err) return callback(err);
            callback(null,result);
        })
    })
};


/* GET home page. */
router.get('/', function(req, res, next) {
  var sql='select * from jg_amend where id=1';
  search(sql,function (err,result) {
      if(err){
        res.render('index',{
          title:'error'
        })
      }else{
        console.log(result)
        res.render('index',{
          title:result,
            data:result
        })
      }
  })
});

module.exports = router;
