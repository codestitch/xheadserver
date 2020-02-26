import { Express } from 'express';
import { gameController, gameValidation } from '../game';

export function AppRoute(app: Express) {
   app.get('/api/v1/games', gameController.all);

   app.post('/api/v1/deal', gameValidation.newDeal, gameController.newDeal);
   app.get('/api/v1/draw/:id', gameController.draw);

   app.post('/api/v1/player', gameValidation.newPlayer, gameController.newPlayer);
}
