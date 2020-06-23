var fetch = require('node-fetch')

const api_key = "1209c73f14597cc45c91696c34a854c7"

class Film{
    getFilm(query){
        const url = "https://api.themoviedb.org/3/search/movie/?query="+query+"&api_key="+api_key+"&language=en-US&page=1&include_adult=false"
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