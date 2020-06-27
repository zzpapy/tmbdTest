const sqlite3 = require('sqlite3').verbose()

class Connect{
    // constructor(){
    //     this.db = this.open()
    // }
    open() {
        this.db = new sqlite3.Database('./db/pref.db', (err) => {
            if (err) {
            console.error(err.message);
            }
            console.log('Connected to the database.')
        })
    }

    getAll(sql, myClass) {
        this.open()
        let tab = []
        let i = 0
        
        this.db.all(sql, (err, rows) => {
            if (err) {
                console.error(err.message)
            }
            // console.log("rere",tab)
            rows.forEach((row) => {
                tab.push(new myClass(row))
              });
            i++
        })
        this.db.close()
        return tab
    }

    getById(sql, myClass, id){
        this.open()
        return new Promise((resolve, reject) => {
            this.db.get(sql, [id], (err, row) => {
                this.db.close()
                if (err) {
                    reject(err.message)
                }
                resolve(new myClass(row))
            })
        })
    }
    async run(sql) {
        this.open()
        this.db.run("CREATE TABLE IF NOT EXISTS comment1(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, movie_id INTEGER)")
        console.log(sql)
        await this.db.run(sql, (err) => {
            if (err) {
                console.error(err.message)
            }
        })
        this.db.close()
    }
    
    close(){
        db.close((err) => {
            if (err) {
                console.error(err.message)
            }
            console.log('Close the database connection.')
        })

    }
}
/*

let results = 

  

*/
module.exports = new Connect()