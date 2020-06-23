var express = require('express')
var router = express.Router()
var film = require('../modeles/Film')


router.get('/', async function(req, res, next) {
  
  
  res.render('index', { 
    
    film: ""
  })
})

router.post('/', async function(req, res, next) {
  let query = req.body.search
  let movie = await film.getFilm(query)
  
  res.render('index', { 
    
    film: movie
  })
})

module.exports = router;
