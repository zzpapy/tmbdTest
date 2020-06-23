var express = require('express')
var router = express.Router()
var film = require('../modeles/Film')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express' ,
    film:film
  })
})

module.exports = router;
