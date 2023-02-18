var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/transfer', function(req, res, next) {
  console.log(req.body);
  console.log('received post from frontend');
  return res.status(200).send('some text');
});

router.get('/*', function(req, res, next) {
  console.log(req.url);
  console.log(req.body);
})


module.exports = router;
