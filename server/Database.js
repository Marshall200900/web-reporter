import sqllite3 from 'sqlite3';
import crypto from 'crypto';


export default class Database {

    constructor(path) {
        this.db = new sqllite3.Database(path);
    }

    runQuery = (query) => {
        return new Promise((resolve, reject) => {
            this.db.run(query, (err) => {
                if(err) { reject(err) }
                resolve();
            })
        })
    }
    getQuery = (query) => {
        return new Promise((resolve, reject) => {
            this.db.get(query, (err, row) => {
                if(err) { reject(err) }
                resolve(row);
            })
        })
    }
    allQuery = (query) => {
        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows) => {
                if(err) { reject(err) }
                resolve(rows);
            })
        })
    }

    // reports

    // create
    postReport(requestData) {
        const { title, maintext, tags, filenames } = requestData;
        const date = new Date().toISOString().split('T')[0].split('-');
        const parsedDate = `${date[2]}-${date[1]}-${date[0]}`;
        return this.runQuery('INSERT INTO reports (title, description, images_links, tags, date_created, status)' +
        `VALUES ('${title}', '${maintext}', '${filenames.join(',')}', '${tags}', '${parsedDate}', 'Todo')`);
    }
    // read
    getReportById(id) {
        return this.getQuery(`SELECT report_id, title, date_created, description, images_links, tags, status FROM reports WHERE report_id = ${id}`);
    }
    getImagesListById(id) {
        return this.getQuery(`SELECT images_links FROM reports WHERE report_id = ${id}`);
    }
    getShortReports(limit = 50, offset = 0) {
        return this.allQuery(`SELECT report_id, title, date_created, tags, status FROM reports LIMIT ${limit} OFFSET ${offset}`);
    }
    getReports(limit = 50, offset = 0) {
        return this.allQuery(`SELECT report_id, title, date_created, tags, status FROM reports LIMIT ${limit} OFFSET ${offset}`);
    }
    // update
    updateData(id, fields_to_update) {
        const { title, description, tags, status } = fields_to_update;

        const arrayOfStrings = [];
        
        title && arrayOfStrings.push(`title = '${title}'`);
        description && arrayOfStrings.push(`description = '${description}'`);
        tags && arrayOfStrings.push(`tags = '${tags}'`);
        status && arrayOfStrings.push(`status = '${status}'`);
        
        return this.runQuery(`UPDATE reports SET ${arrayOfStrings.join(',')} WHERE report_id = ${id}`);
    }
    // delete
    deleteData(id) {
        return this.runQuery(`DELETE FROM reports WHERE report_id = ${id}`);
    }

    // tokens
    getTokens(userId) {
        return this.allQuery(`SELECT token_id, token FROM tokens LEFT JOIN users ON tokens.token_id = users.user_id WHERE tokens.user_id = ${userId}`);
    }
    getToken(tokenId) {
        return this.getQuery(`SELECT token_id, token, addresses FROM tokens LEFT JOIN users ON tokens.token_id = users.user_id WHERE tokens.token_id = "${tokenId}"`);
    }
    deleteToken(id) {
        return this.runQuery(`DELETE FROM tokens WHERE token_id = "${id}"`);
    }
    postToken(token, userId) {
        const token_id = crypto.randomBytes(16).toString('hex');
        return this.runQuery(`INSERT INTO tokens (token_id, token, user_id) VALUES ("${token_id}", "${token}", "${userId}")`)
    }
    putToken(addresses, tokenId) {
        console.log(addresses, tokenId)
        return this.runQuery(`UPDATE tokens SET addresses = "${addresses}" WHERE token_id = "${tokenId}"`)
    }


    // tags
    getTags() {
        return this.allQuery('SELECT * FROM tags');
    }
    // users
    getUser(login, password) {
        return this.getQuery(`SELECT * FROM users WHERE login="${login}" AND password="${password}"`);
    }

}