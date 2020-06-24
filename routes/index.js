var express = require('express')
var router = express.Router()
var film = require('../modeles/Film')


router.get('/', async function(req, res, next) {
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  let movie = await film.getNow(page)
  
  res.render('index', { 
    
    films: movie,
    actu: "Actuellement en france"
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
    query: query,
    actu: "vos résultats pour votre recherche : "+query
  })
})
router.get('/now', async function(req, res, next) {
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  let movie = await film.getNow(page)
  
  res.render('index', { 
    
    films: movie
  })
})
router.post('/now', async function(req, res, next) {
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  let movie = await film.getNow(page)
  
  res.render('index', { 
    
    films: movie
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
  res.render('detailFilm', { 
    
    film: movie.film,
    cast: movie.cast
  })
})
router.get('/actor', async function(req, res, next) {
  let id = req.query.id
 
  let actor = await film.getActor(id)
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
  let actor = await film.getActor(id,page)
  res.render('actor', { 
    
    acteur: actor.acteur,
    films:actor.films
  })
})
router.post('/actorFind', async function(req, res, next) {
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
router.post('/year', async function(req, res, next) {
  let dateDeb = req.body.dateDeb
  let dateFin = req.body.dateFin
  console.log(req.body.fr == undefined)
  if(req.body.fr == undefined){
    region = ""
  }
  else{
     region = req.body.fr
  }
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  let movie = await film.getYearFilm(dateDeb,dateFin,page,region)
  
  res.render('year', { 
    
    films: movie,
    dateDeb:dateDeb,
    dateFin:dateFin
  })
})

module.exports = router
