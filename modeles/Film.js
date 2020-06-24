var fetch = require('node-fetch')

const api_key = "1209c73f14597cc45c91696c34a854c7"

class Film{
    getFilm(query,page){
        const url = "https://api.themoviedb.org/3/search/movie/?query="+query+"&api_key="+api_key+"&language=fr-FR&page="+page+"&include_adult=false"
        return fetch(url)
            .then(function(res){
                return res.json()
            })
            .then(function(json){
                return json
            })
            .catch(function(er){
                console.log("error",er)
            })
        
    }
    getNow(page){
        const url = "https://api.themoviedb.org/3/movie/now_playing?sort_by=primary_release_date.desc&api_key="+api_key+"&language=fr-FR&page="+page+"&region=FR"
        return fetch(url)
            .then(function(res){
                return res.json()
            })
            .then(function(json){
                return json
            })
            .catch(function(er){
                console.log("error",er)
            })
        
    }
    getYearFilm(dateDeb,dateFin,page,region){
        console.log(region)
        const url = "https://api.themoviedb.org/3/discover/movie?sort_by=primary_release_date.desc&region="+region+"&api_key="+api_key+"&primary_release_date.gte="+dateDeb+"&page="+page+"&primary_release_date.lte="+dateFin
        
        return fetch(url)
            .then(function(res){
                return res.json()
            })
            .then(function(json){
                return json
            })
            .catch(function(er){
                console.log("error",er)
            })
        
    }
    async getMovie(id){
        let film = await fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key+"&language=fr-FR")
            .then(function(res){
                return res.json()
            })
            .then(function(json){
                return json
            })
            .catch(function(er){
                console.log("error",er)
            })
        let cast = await fetch("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key="+api_key)
            .then(function(res){
                return res.json()
            })
            .then(function(json){
                return json
            })
            .catch(function(er){
                console.log("error",er)
            }) 
        return {cast:cast,film:film}
    }
    async getActor(id){
        let acteur = await fetch("https://api.themoviedb.org/3/person/"+id+"?api_key="+api_key)
            .then(function(res){
                return res.json()
            })
            .then(function(json){
                return json
            })
            .catch(function(er){
                console.log("error",er)
            })
        let films = await fetch("https://api.themoviedb.org/3/person/"+id+"/movie_credits?api_key="+api_key+"&language=en-US")
            .then(function(res){
                return res.json()
            })
            .then(function(json){
                return json
            })
            .catch(function(er){
                console.log("error",er)
            })

        return {acteur:acteur,films:films}
        
    }
    findActor(query){
        console.log(query)
        const url = "https://api.themoviedb.org/3/search/person?query="+query+"&api_key="+api_key+"&page="+page+"&include_adult=false"
        return fetch(url)
            .then(function(res){
                return res.json()
            })
            .then(function(json){
                return json
            })
            .catch(function(er){
                console.log("error",er)
            })
        
    }
}
module.exports = new Film()