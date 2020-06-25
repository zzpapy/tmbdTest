class Like{
    constructor(obj){
        
        Object.assign(this, obj)
        
    }
    addLike(){
        this.nb_likes++
    }
    removeLike(){
        this.nb_likes--
    }
}
module.exports = Like