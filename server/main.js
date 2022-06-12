import express from 'express';
import { initReportsRequestHandler } from './reportsRequestsHandler.js';
import { initAuthRequestsHandler } from './authRequestsHandler.js';
import Database from './Database.js';
import { initTagsRequestsHandler } from './tagsRequestsHandler.js';
import { initTokensRequestsHandler } from './tokensRequestsHandler.js';

const db = new Database('./records.db');



const app = express();
app.use(express.json());
initTokensRequestsHandler(app, db);
initReportsRequestHandler(app, db);
initAuthRequestsHandler(app, db);
initTagsRequestsHandler(app, db);

app.listen(1000, () => {
    console.log('listening to 1000');
})