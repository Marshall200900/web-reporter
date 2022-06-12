import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token, authHeader, req.headers)
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403);
    req.user = user

    next();
  })
}


export const initAuthRequestsHandler = (app, db) => {
  
    app.post('/auth', (req, res, next) => {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      console.log(token, authHeader, req.headers)
      if (token == null) return res.sendStatus(401)
    
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
    
        if (err) return res.sendStatus(403)
    
        req.user = user
        res.status(200).end();
      })
    });

    app.post('/login', (req, res) => {
      const auth = (req.headers.authorization || '').split(' ')[1] || '';
      const [login, password] = Buffer.from(auth, 'base64').toString().split(':')
      
      db.getUser(login, password)
      .then((row) => {
        if (row && row.login === login && row.password === password) {
          const token = generateAccessToken({ username: login });
          res.json(token);
  
        } else {
          res.status(401).end();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      })

    });
}