import sqllite3 from 'sqlite3';


export default class Database {

    constructor(path) {
        this.db = new sqllite3.Database(path);
    }

    // reports

    // create
    postReport(requestData) {
        const { title, maintext, tags, filenames } = requestData;
        return new Promise((resolve, reject) => {
            const date = new Date().toISOString().split('T')[0].split('-');
            const parsedDate = `${date[2]}-${date[1]}-${date[0]}`;
            this.db.run('INSERT INTO reports (title, description, images_links, tags, date_created, status)' +
                `VALUES ('${title}', '${maintext}', '${filenames.join(',')}', '${tags}', '${parsedDate}', 'Todo')`, (err) => {
                    if(err) {
                        reject(err);
                    }
                    resolve();
                })
        });
    }
    // read
    getReportById(id) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT report_id, title, date_created, description, images_links, tags, status FROM reports WHERE report_id = ${id}`, (err, row) => {
                if(err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }
    getImagesListById(id) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT images_links FROM reports WHERE report_id = ${id}`, (err, row) => {
                if(err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }
    getShortReports(limit = 50, offset = 0) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT report_id, title, date_created, tags, status FROM reports LIMIT ${limit} OFFSET ${offset}`, (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
    getReports(limit = 50, offset = 0) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT report_id, title, date_created, tags, status FROM reports LIMIT ${limit} OFFSET ${offset}`, (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
    // update
    updateData(id, fields_to_update) {
        const { title, description, tags, status } = fields_to_update;

        const arrayOfStrings = [];
        
        title && arrayOfStrings.push(`title = '${title}'`);
        description && arrayOfStrings.push(`description = '${description}'`);
        tags && arrayOfStrings.push(`tags = '${tags}'`);
        status && arrayOfStrings.push(`status = '${status}'`);
        
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE reports SET ${arrayOfStrings.join(',')} WHERE report_id = ${id}`, (err) => {
                    if(err) {
                        reject(err);
                    }
                    resolve();
                })
        });
    }
    // delete
    deleteData(id) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM reports WHERE report_id = ${id}`, (err) => {
                    if(err) {
                        reject(err);
                    }
                    resolve();
                })
        });
    }

    // tokens
    getTokens() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT token_id, token FROM tokens LEFT JOIN users ON tokens.token_id = users.user_id`, (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }


    // tags
    getTags() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM tags', (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    // users
    getUser(login, password) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM users WHERE login="${login}" AND password="${password}"`, (err, row) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(row);
                })
        });    }

}