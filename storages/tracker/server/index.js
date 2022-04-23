import express from 'express';
const app = express();




app.get('/ping', (req, res) => {
    res.send('hi?')
})

app.listen(1000, () => {
    console.log('listening to 1000')
})
