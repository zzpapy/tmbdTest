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
    var movie = await film.getNow(page)
    actu = "Actuellement en France"
  }
  else{
    var movie = await film.getFilm(query,page)
    actu = "vos résultats pour votre recherche : "+query
  }
  let sess = req.session
  sess.test = "toto"
  console.log(sess)
  console.log(query)
  res.render('index', { 
    
    films: movie,
    search: query,
    actu: actu,
    page: page
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
  console.log(query)
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

router.get('/film/:id?', async function(req, res, next) {
  let id = req.params.id
  
  let comments = await manager.getAll("select * from comment1 WHERE movie_id="+id, Comment)
  let likes = await manager.getById('SELECT * FROM like WHERE id_movie = :id',Like,id)

  let movie = await film.getMovie(id)
  res.render('detailFilm', { 
    likes: likes.nb_like,
    comments: comments,
    film: movie.film,
    cast: movie.cast
  })
})
router.get('/actor/:id?', async function(req, res, next) {
  let id = req.params.id
  console.log(id)
  let comments = await manager.getAll("select * from comment1 WHERE movie_id="+id, Comment)
  let actor = await film.getActor(id)
  res.render('actor', { 
    comments: comments,
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
router.post('/actorFind/:id?', async function(req, res, next) {
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
  if(typeof req.body.actor !== 'undefined'){
    console.log("toto")
    res.redirect('/actor/'+id)
  }
  else{
    res.redirect('/film/'+id)
  }
})
router.get("/delete", async function(req, res, next){
 
  let id = req.query.id
  let film_id = req.query.film_id
  manager.run('delete from comment1 where id='+id)

  let movie = await film.getMovie(film_id)
  res.redirect('/film/'+film_id)
})
router.get("/addLike/:id?",async function(req, res, next){
  id = req.params.id
  console.log(id)
  like_movie = await manager.getById('SELECT * FROM like WHERE id_movie = ?',Like,id)
  nb_like = like_movie.nb_like + 1
  if(typeof like_movie.nb_like != 'undefined'){
    await manager.run('UPDATE like SET nb_like ='+(nb_like)+' WHERE id_movie='+id)
  }
  else{
    await manager.run('insert into like (id_movie,nb_like) values ("'+id+'","1")')
  }
  
  res.redirect('/film/'+id)
})

module.exports = router
