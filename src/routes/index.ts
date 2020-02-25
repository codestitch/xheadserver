import { Express } from 'express';
import * as TodoRoutes from './todo';
import { AppRoute } from './game.route';

export function initRoutes(app: Express) {
   app.get('/', (req, res) => {
      res.send('Hello World, from express');
   });

   AppRoute(app);
   TodoRoutes.routes(app);
}
