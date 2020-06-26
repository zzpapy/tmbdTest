var express = require('express')
var router = express.Router()
var api = require('../model/apiHandler')

const Like = require('../model/Like.class')
var manager = require('../db/connect')

router.get("/", function(req, res, next){
  
  let likes = manager.getAll("select * from likes", Like)

  res.render('index', { 
    films: '',
    likes: likes
  })
})
router.get("/addComment", function(req, res, next){
  
  let likes = manager.getAll("select * from likes", Like)

  res.render('index', { 
    films: '',
    likes: likes
  })
})

router.get("/addLike/:id", function(req, res, next){
  //bdd bla bla bla
  res.json(8)
})

/* GET home page. */
router.get('/search/:page?', async function(req, res, next) {
 
  let query = req.query.query

  if(typeof query === undefined){
    query = 'Action'
  }

  let films = await api.searchMovies(query)
   
  res.render('index', { 
    films: films
  })
  
})

router.get('/film/:id?', async function(req, res, next){
  let id = req.params.id

  if(typeof id === undefined){
    id = '128'
  }

  let filmAndCast = await api.getMovie(id)

  let likes = await manager.getById('SELECT * FROM likes WHERE id_movie = ?', Like, id)

  res.render('film', { 
    film: filmAndCast.movie,
    cast: filmAndCast.casting,
    likes: likes
  })
})

module.exports = router
