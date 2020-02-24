import { Express } from 'express';
import * as TodoRoutes from './todo';

export function initRoutes(app: Express) {
   app.get('/', (req, res) => {
      res.send('Hello World, from express');
   });

   TodoRoutes.routes(app);
}