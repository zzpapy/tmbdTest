const sqlite3 = require('sqlite3').verbose();

class Connect{
    constructor(){
        this.db = this.open()
    }
    open() {
        let db = new sqlite3.Database('./db/preferences.db', (err) => {
            if (err) {
            console.error(err.message);
            }
            console.log('Connected to the database.');
        });
        return db
    }

    getAll(sql, myClass) {
        let likes = []
        this.db.each(sql, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            likes.push(new myClass(row))
        });
        return likes
    }

    getById(sql, myClass, id){
        return new Promise((resolve, reject) => {
            this.db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err.message)
                }
                resolve(new myClass(row))
            });
        })
    }
}
/*

let results = 

  
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
*/
module.exports = new Connect()