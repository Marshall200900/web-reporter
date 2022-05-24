import express from 'express';
const app = express();
import Database from './Database.js';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import crypto from 'crypto';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});
   
const upload = multer({ storage: storage })

const waitingQueue = [];

// const sendIncomingData = (fields) => {

//     const formData = new FormData();
//     console.log(fields);
//     formData.append('title', fields.title);
//     formData.append('maintext', fields.maintext);
//     // formData.append('tags', fields.tags);
//     fields.filenames.forEach(filename => {
//         formData.append('image', fs.createReadStream(`./uploads/${filename}`));
//     });

//     waitingQueue.map((host) => {
//         fetch(`${host}/update`, {
//             method: 'POST',
//             body: formData
//         })
//     })    
// }


const db = new Database('./records.db');

app.use(express.json());

app.post('/reports', upload.array('images'), (req, res) => {
    const { title, maintext, tags } = req.body;
    const filenames = req.files.map(el => el.filename);

    const requestData = { title, maintext, tags, filenames };
    // sendIncomingData(requestData)

    db.postReport(requestData).then((value) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end();
    }).catch((reason) => {
        res.status(500).send(reason);
    });
});
app.get('/subscribe', (req, res) => {
    var protocol = req.protocol;

    var hostHeaderIndex = req.rawHeaders.indexOf('Host') + 1;
    var host = hostHeaderIndex ? req.rawHeaders[hostHeaderIndex] : undefined;
  
    Object.defineProperty(req, 'origin', {
      get: function () {
        if (!host) {
          return req.headers.referer ? req.headers.referer.substring(0, req.headers.referer.length - 1) : undefined;
        }
        else {
          return protocol + '://' + host;
        }
      }
    });
    console.log(req.origin);

    console.log(`${req.headers.host} has added to the queue`);
    waitingQueue.push(req.headers.host);
    res.end();
})
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
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(value);
    }).catch((reason) => {
        res.status(500).send(reason);
    });
});

app.get('/reports/:id', (req, res) => {
    const { id } = req.params;
    const { image } = req.query;
    if(image) {
        if(!isNaN(Number(image))) {
            db.getImagesListById(id).then((value) => {
                const imgUrl = value.images_links.split(',')[Number(image)];
                const __dirname = path.resolve(path.dirname(''));
                
                res.sendFile(__dirname + '/uploads/' + imgUrl);
                
            })
        } else {
            res.status(500).end();
        }
    } else {
        
            db.getReportById(id).then((el) => {
                
                el.images_count = el.images_links && el.images_links.split(',').length;
                delete el.images_links
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(el);
            }).catch((reason) => {
                res.status(500).send(reason);
            });
    }
})

app.put('/reports/:id', (req, res) => {
    const { id } = req.params;
    db.updateData(id, req.query).then(() => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end();
    }).catch((reason) => {
        res.status(500).send(reason);
    });
});

app.delete('/reports/:id', (req, res) => {
    const { id } = req.params;
    db.getImagesListById(id).then((row) => {
        console.log(row)
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
app.get('/token/new', (req, res) => {
    var token = crypto.randomBytes(64).toString('hex');
    
    res.send(token);
})

app.listen(1000, () => {
    console.log('listening to 1000');
})