var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
var film = require('../modeles/Film')
const Comment = require('../modeles/Comment.Class')
const Like = require('../modeles/Like.Class')
var manager = require('../db/connect')


router.get('/', async function(req, res, next) {
  let query = req.query.search
  
  if(typeof req.query.page == undefined){
    let page = "1"    
  }
  else{
    page = req.query.page
  }
  if(req.query.search == undefined){
    console.log(query)
    var movie = await film.getNow(page)
  }
  else{
    var movie = await film.getFilm(query,page)
  }
  
  res.render('index', { 
    
    films: movie,
    search: query,
    actu: "vos résultats pour votre recherche : "+query
    // actu: "Actuellement en france"
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
  req.session.movies = movie
  res.render('index', { 
    
    films: movie,
    search: query,
    actu: "vos résultats pour votre recherche : "+query
  })
})
router.get('/now', async function(req, res, next) {
  if(typeof req.query.page == undefined){
    let page = "1"    
  }
  else{
    page = req.query.page
  }
  let movie = await film.getNow(page)
  
  res.render('index', { 
    
    films: movie,
    actu: "Actuellement en france"
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
    
    films: movie,
    actu: "Actuellement en france"
  })
})

router.get('/film', async function(req, res, next) {
  
  
  var sess = req.session
  console.log(sess)
  let id = req.query.id
  if(typeof req.body.page == undefined){
    let page = "1"    
  }
  else{
    page = req.body.page
  }
  let comments = await manager.getAll("select * from comment1 WHERE movie_id="+id, Comment)
  let likes = await manager.getAll("select * from like", Like)
  let movie = await film.getMovie(id)
  res.render('detailFilm', { 
    comments: comments,
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
    dateFin:dateFin,
    region: region
  })
})
router.post("/addComment", async function(req, res, next){
  let text = req.body.text
  let id = req.body.id
  manager.run('insert into comment1 (text,movie_id) values ("'+text+'","'+id+'")')

  let movie = await film.getMovie(id)
  res.redirect('localhost:3000/detailFilm',301, { 
    
    film: movie.film,
    cast: movie.cast,
  })
})
router.get("/delete", async function(req, res, next){
 
  let id = req.query.id
  let film_id = req.query.film_id
  manager.run('delete from comment1 where id='+id)

  let movie = await film.getMovie(film_id)
  res.redirect('localhost:3000/detailFilm',301, { 
    
    film: movie.film,
    cast: movie.cast,
  })
})

module.exports = router
