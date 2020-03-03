import { Express } from 'express';

export function swaggerInit(app: Express) {
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
}
