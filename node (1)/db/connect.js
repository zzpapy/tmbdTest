const sqlite3 = require('sqlite3').verbose();

class Connect{
   
    open() {
        this.db = new sqlite3.Database('./db/preferences.db', (err) => {
            if (err) {
            console.error(err.message);
            }
            console.log('Connected to the database.')
        });
    }

    getAll(sql, myClass) {
        this.open()
        let likes = []
        this.db.each(sql, (err, row) => {
            
            if (err) {
                console.error(err.message)
            }
            likes.push(new myClass(row))
        });
        this.close()
        return likes
    }

    getById(sql, myClass, id){
        this.open()
        return new Promise((resolve, reject) => {
            this.db.get(sql, [id], (err, row) => {
                this.close()
                if (err) {
                    reject(err.message)
                }
                resolve(new myClass(row))
            });
        })
        
    }
    close(){
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}

module.exports = new Connect()