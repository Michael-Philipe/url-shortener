import { URLController } from './controller/URLController';
import express from 'express';
import { MongoConnection } from './database/MongoConnection';

const app = express();
app.use(express.json());
const database = new MongoConnection();
database.connect();

const urlController = new URLController();
app.post('/shorten', urlController.shorten);
app.get('/:hash', urlController.redirect);

app.listen(5000, () => console.log('Express listening'));
