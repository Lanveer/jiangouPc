var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('test',{
    title:'this is only a test'
  })
  //   res.send('efdefre')
});

module.exports = router;
