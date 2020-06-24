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
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  let movie = await film.getFilm(query,page)
  
  res.render('index', { 
    
    films: movie,
    query: query
  })
})
router.get('/film', async function(req, res, next) {
  let id = req.query.id
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  let movie = await film.getMovie(id)
  console.log(movie)
  res.render('detailFilm', { 
    
    film: movie.film,
    cast: movie.cast
  })
})
router.get('/actor', async function(req, res, next) {
  let id = req.query.id
 
  let actor = await film.getActor(id)
  console.log(actor)
  res.render('actor', { 
    
    acteur: actor.acteur,
    films:actor.films
  })
})
router.post('/actor', async function(req, res, next) {
  let id = req.body.id
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  console.log(page)
  let actor = await film.getActor(id,page)
  console.log(actor)
  res.render('actor', { 
    
    acteur: actor.acteur,
    films:actor.films
  })
})
router.post('/actor', async function(req, res, next) {
  let query = req.body.search
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  let acteurs = await film.findActor(query,page)
  
  res.render('listActor', { 
    
    acteurs: acteurs,
    query: query
  })
})

module.exports = router
