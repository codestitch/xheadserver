import { Express } from 'express';
import { AppRoute } from './game.route';

export const routes = {
   init: (app: Express) => {
      app.get('/', (req, res) => {
         res.send('Hello World, from express');
      });

      AppRoute(app);
   }
};
