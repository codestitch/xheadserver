import * as express from 'express';
import * as bodyParser from 'body-parser';

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

routes.init(app);
db.init();

app.listen(PORT, () =>
   console.log(`Hello world app listening on port ${PORT}!`)
);
