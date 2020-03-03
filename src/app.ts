import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as WebSocket from 'ws';
import * as http from 'http';

import { routes } from './routes/index';
import { db } from './db/models';

const app = express();
const PORT = 3000;

// swagger
const expressSwagger = require('express-swagger-generator')(app);
const options = {
   swaggerDefinition: {
      info: {
         description: 'This is a sample server',
         title: 'Swagger',
         version: '1.0.0'
      },
      host: 'localhost:3000',
      basePath: '/api/v1',
      produces: ['application/json', 'application/xml'],
      schemes: ['http', 'https'],
      securityDefinitions: {
         JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: ''
         }
      }
   },
   basedir: __dirname,
   files: [
      './routes/*.ts',
      './game/*.ts',
      './game/model/*.ts',
      './db/models/*.ts'
   ]
};

expressSwagger(options);

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

routes.init(app);
db.init();

// app.listen(PORT, () =>
// console.log(`Hello world app listening on port ${PORT}!`)
// );

//initialize a simple http server
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
   
   //connection is up, let's add a simple simple event
   ws.on('message', (message: string) => {

      //log the received message and send it back to the client
      console.log('received: %s', message);

      const broadcastRegex = /^broadcast\:/;

      if (broadcastRegex.test(message)) {
         message = message.replace(broadcastRegex, '');

         //send back the message to the other clients
         wss.clients.forEach(client => {
            console.log(client., ws);
            if (client != ws) {
               client.send(`Hello, broadcast message -> ${message}`);
            }
         });
      } else {
         ws.send(`Hello, you sent -> ${message}`);
      }
   });
   //send immediatly a feedback to the incoming connection
   ws.send('Hi there, I am a WebSocket server');
});

server.listen(PORT, () => {
   console.log(`Server started on port ${PORT} :)`);
});
