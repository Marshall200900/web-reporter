import { authenticateToken } from "./authRequestsHandler.js"


export const initTokensRequestsHandler = (app, db) => {
    app.get('/tokens', authenticateToken, (req, res) => {
        db.getTokens().then((value) => {
            console.log(value);
            res.json(value);
        }).catch((reason) => {
            console.log(reason);
            res.status(500).end();
        });
    });
}