import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateToken } from './authRequestsHandler.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage })


export const initReportsRequestHandler = (app, db) => {
  app.post("/reports", upload.array("images"), (req, res) => {
    const { title, maintext, tagIds } = req.body;
    const filenames = req.files.map((el) => el.filename);

    const requestData = { title, maintext, tagIds, filenames };

    db.postReport(requestData)
      .then(() => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send();
      })
      .catch((reason) => {
        res.status(500).send(reason);
      });
  });
  app.get("/reports", authenticateToken, (req, res) => {
    const { offset, limit, short } = req.query;
    let promise;
    if (short) {
      promise = db.getShortReports(limit, offset);
    } else {
      promise = db.getReports(limit, offset);
    }
    promise
      .then(async (value) => {

        const tags = await db.getTags();

        value.map((el) => {
          el.images_count = el.images_links && el.images_links.split(",").length;
          delete el.images_links;
          const tagIds = el.tags;
          if(tagIds) {
            el.tags = tagIds.split(',').map(tagId => tags.find(tag => tag.tag_id === parseInt(tagId)))
          }

          
        });
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(value);
      })
      .catch((reason) => {
        res.status(500).send(reason);
      });
  });
  app.get("/reports/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    const { image } = req.query;
    if (image) {
      if (!isNaN(Number(image))) {
        db.getImagesListById(id).then((value) => {
          
          const imgUrl = value.images_links.split(",")[Number(image)];
          const __dirname = path.resolve(path.dirname(""));

          res.sendFile(__dirname + "/uploads/" + imgUrl);
        });
      } else {
        res.status(500).end();
      }
    } else {
      db.getReportById(id)
        .then(async (el) => {
          const tags = await db.getTags();
          const tagIds = el.tags;
          if(tagIds) {
            el.tags = tagIds.split(',').map(tagId => tags.find(tag => tag.tag_id === parseInt(tagId)))
          }

          el.images_count = el.images_links && el.images_links.split(",").length;
          delete el.images_links;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(el);
        })
        .catch((reason) => {
          res.status(500).send(reason);
        });
    }
  });

  app.put("/reports/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    db.updateData(id, req.query)
      .then(() => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end();
      })
      .catch((reason) => {
        res.status(500).send(reason);
      });
  });

  app.delete("/reports/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    db.getImagesListById(id).then((row) => {
      console.log(row);
      if (row.images_links) {
        row.images_links.split(",").map((name) => {
          fs.unlink("./uploads/" + name, (err) => {
            if (err) {
              res.status(500).send("Error! The image is not found!");
              return;
            }
          });
        });
      }
      db.deleteData(id)
        .then((result) => {
          console.log(result);
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.end();
        })
        .catch((reason) => {
          console.log(reason);
          res.status(500).send(reason);
        });
    });
  });
  app.post("/reports", authenticateToken, upload.array("images"), (req, res) => {
    const { title, maintext, tags } = req.body;
    const filenames = req.files.map((el) => el.filename);

    const requestData = { title, maintext, tags, filenames };

    db.postReport(requestData)
      .then((value) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end();
      })
      .catch((reason) => {
        res.status(500).send(reason);
      });
  });
  app.get("/reports", authenticateToken, (req, res) => {
    const { offset, limit, short } = req.query;
    let promise;
    if (short) {
      promise = db.getShortReports(limit, offset);
    } else {
      promise = db.getReports(limit, offset);
    }
    promise
      .then((value) => {
        value.map((el) => {
          el.images_count =
            el.images_links && el.images_links.split(",").length;
          delete el.images_links;
        });
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(value);
      })
      .catch((reason) => {
        res.status(500).send(reason);
      });
  });
  app.get("/reports/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    const { image } = req.query;
    if (image) {
      if (!isNaN(Number(image))) {
        db.getImagesListById(id).then((value) => {
          const imgUrl = value.images_links.split(",")[Number(image)];
          const __dirname = path.resolve(path.dirname(""));

          res.sendFile(__dirname + "/uploads/" + imgUrl);
        });
      } else {
        res.status(500).end();
      }
    } else {
      db.getReportById(id)
        .then((el) => {
          el.images_count =
            el.images_links && el.images_links.split(",").length;
          delete el.images_links;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(el);
        })
        .catch((reason) => {
          res.status(500).send(reason);
        });
    }
  });


  app.delete("/reports/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    db.getImagesListById(id).then((row) => {
      console.log(row);
      if (row.images_links) {
        row.images_links.split(",").map((name) => {
          fs.unlink("./uploads/" + name, (err) => {
            if (err) {
              res.status(500).send("Error! The image is not found!");
              return;
            }
          });
        });
      }
      db.deleteData(id)
        .then(() => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.end();
        })
        .catch((reason) => {
          res.status(500).send(reason);
        });
    });
  });
};
