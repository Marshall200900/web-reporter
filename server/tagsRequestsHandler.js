import { authenticateToken } from "./authRequestsHandler.js"


export const initTagsRequestsHandler = (app, db) => {
    app.get('/tags', authenticateToken, (req, res) => {
        db.getTags().then((value) => {
            console.log(value);
            res.json(value);
        }).catch((reason) => {
            console.log(reason);
            res.status(500).end();
        });

    });
}