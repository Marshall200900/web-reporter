import express from 'express';
const app = express();
import Database from './Database.js';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});
   
const upload = multer({ storage: storage })


const db = new Database('./records.db');

app.use(express.json());

app.post('/reports', upload.array('images', 3), (req, res) => {
    const { title, maintext, tags } = req.body;
    const filenames = req.files.map(el => el.filename);

    const requestData = { title, maintext, tags, filenames };
    
    db.postReport(requestData).then((value) => {
        res.end();
    }).catch((reason) => {
        res.status(500).send(reason);
    });
});

app.get('/reports', (req, res) => {
    const { offset, limit, short } = req.query;
    let promise;
    if(short) {
        promise = db.getShortReports(limit, offset);
    } else {
        promise = db.getReports(limit, offset);
    }
    promise.then((value) => {
        value.map(el => {
            el.images_count = el.images_links && el.images_links.split(',').length;
            delete el.images_links
        });
        res.send(value);
    }).catch((reason) => {
        res.status(500).send(reason);
    });
});

app.get('/reports/:id', (req, res) => {
    const { id } = req.params;
    db.getReportById(id).then((el) => {
        
        el.images_count = el.images_links && el.images_links.split(',').length;
        delete el.images_links

        res.send(value);
    }).catch((reason) => {
        res.status(500).send(reason);
    });
})

app.put('/reports/:id', (req, res) => {
    const { id } = req.params;
    db.updateData(id, req.query).then(() => {
        res.end();
    }).catch((reason) => {
        res.status(500).send(reason);
    });
});

app.delete('/reports/:id', (req, res) => {
    const { id } = req.params;
    db.getImagesListById(id).then((row) => {
        if(row.images_links) {
            row.images_links.split(',').map(name => {
                fs.unlink("./uploads/" + name, (err) => {
                    if(err) {
                        res.status(500).send('Error! The image is not found!');
                        return;
                    }
                });
            })
        }
        db.deleteData(id).then(() => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end();
        }).catch((reason) => {
            res.status(500).send(reason);
        });
    })


});

app.get('/img/id', (req, res) => {
    const { img_name } = req.params;
    
})

app.listen(1000, () => {
    console.log('listening to 1000');
})