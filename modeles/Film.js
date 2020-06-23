const api_key = "1209c73f14597cc45c91696c34a854c7"
const url = "https://api.themoviedb.org/3/movie/550?api_key="+api_key
fetch = require('node-fetch')
fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));


module.exports = url