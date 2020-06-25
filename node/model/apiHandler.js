
var fetch = require('node-fetch')

const api_key = 'a6b1d3e7998d1a2d9a90060fcafe5287'
const lang = 'fr-FR'

class ApiHandler{
    async getMovie(id){
        
        let movie = await fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key='+api_key+'&language='+lang) 
            .then(response => response.json())
            .then(json => json)
            .catch(function(ex) {
                return "error"
            });

        let casting = await fetch('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key='+api_key+'&language='+lang)
            .then(response => response.json())
            .then(json => json)
            .catch(function(ex) {
                return "error"
            });

        return {
            movie: movie,
            casting: casting
        }
    }
    searchMovies(query){
        
        return fetch('https://api.themoviedb.org/3/search/movie/?query='+query+'&api_key='+api_key+'&language='+lang+'&page=1&include_adult=false')
            .then(response => response.json())
            .then(json => json)
            .catch(function(ex) {
                return "error"
            });
    }
}

module.exports = new ApiHandler()