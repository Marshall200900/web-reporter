import sqllite3 from 'sqlite3';


export default class Database {

    constructor(path) {
        this.db = new sqllite3.Database(path);
    }

    // reports

    // create
    createData(title, fields_to_insert) {

    }
    // read
    getDataById(id) {

    }
    getShortDataById(id) {

    }
    getShortDataList(limit = 50, offset = 0) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT report_id, title, date_created, tags, status FROM reports LIMIT ${limit} OFFSET ${offset}`, (err, rows) => {
                console.log(err);
                console.log(rows);
                resolve(rows);
            });
        });
    }
    getDataList(limit = 50, offset = 0) {

    }
    // update
    updateData(id, fields_to_update) {

    }
    // delete
    deleteData(id) {

    }
    // users
    getUser(login, password) {

    }

}