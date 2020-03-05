import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as http from 'http';

import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';

import { routes } from './routes/index';
import { db } from './db/models';
import { swaggerInit } from './swagger';
import { AppRoom } from './card/app-room';

const app = express();
const PORT = 3000;

swaggerInit(app);

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

routes.init(app);
db.init();

const server = http.createServer(app);
const gameServer = new Server({
   server
});

// register your room handlers
gameServer.define('CardBattle', AppRoom);

app.use('/colyseus', monitor());

gameServer.listen(PORT);
console.log(`Listening on ws://localhost:${PORT}`);
