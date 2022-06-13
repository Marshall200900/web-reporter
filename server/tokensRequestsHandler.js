import { authenticateToken } from "./authRequestsHandler.js"
import crypto from 'crypto';

export const initTokensRequestsHandler = (app, db) => {
    app.get('/token', authenticateToken, (req, res) => {
        const token = crypto.randomBytes(16).toString('hex');
        const userId = req.userId.username;
        db.postToken(token, userId).then(() => {
            res.status(200).end();
        }).catch((reason) => {
            
            res.status(500).end();
        });
    });
    app.put('/tokens/:id', authenticateToken, (req, res) => {
        const { addresses } = req.body;
        const { id } = req.params;
        db.putToken(addresses, id).then(() => {
            res.status(200).end();
        }).catch((reason) => {
            console.log(reason);
            res.status(500).end();
        });
    });
    app.get('/tokens/:id', authenticateToken, (req, res) => {
        const { id } = req.params;

        db.getToken(id).then((value) => {
            
            res.json(value);
        }).catch((reason) => {
            
            res.status(500).end();
        });
    });
    app.get('/tokens', authenticateToken, (req, res) => {
        console.log(req.userId.username)
        db.getTokens(req.userId.username).then((value) => {
            res.json(value);
        }).catch((reason) => {
            console.log(reason)
            res.status(500).end();
        });
    });
    app.delete('/tokens/:id', authenticateToken, (req, res) => {
        const { id } = req.params;
        db.deleteToken(id).then((value) => {
            res.status(200).end();
        }).catch((reason) => {
            res.status(500).end();
        });
    });
}