import express from 'express';
import Database from './Database.js';

const app = express();


const db = new Database('./records.db');

app.use(express.json());


app.post('createData', (req, res) => {

});

// PARAMS
// short: boolean
// id: number
app.get('getDataById', (req, res) => {

});
// PARAMS
// short: boolean
// offset: number
// limit: number < 50
app.get('/getData', (req, res) => {
    if(req.query.short) {
        const limit = req.query.limit;
        const offset = req.query.offset;
        db.getShortDataList(limit, offset).then((value) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(value);
        });
    }
});
// PARAMS
// text: string
app.get('getDataByValue', (req, res) => {

});

app.post('updateData', () => {

});

app.post('deleteData', () => {

});

app.use('/auth', (req, res) => {

});

app.listen(1000, () => {
    console.log('listening to 1000');
})