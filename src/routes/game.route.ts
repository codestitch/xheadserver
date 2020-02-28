import { Express } from 'express';
import { gameController, gameValidation, playerController, playerValidation } from '../game';

export function AppRoute(app: Express) {
   app.get('/api/v1/games', gameController.all);
   app.get('/api/v1/games/:id/drawCommit', gameController.drawCommit);
   app.get('/api/v1/games/:id/draw', gameController.draw);
   app.post('/api/v1/games/deal', gameValidation.newDeal, gameController.deal);

   app.post(
      '/api/v1/player/create',
      playerValidation.newPlayer,
      playerController.create
   );
   app.post('/api/v1/player/newcards', playerValidation.newCards, playerController.newCards);
   app.get('/api/v1/player/:id/getcards', playerController.getCards);
}

/**
 * Options
 *
 * app.get('', (req,res) => class.func(req, res))
 *
 * or
 *
 * app.get('', class.func)
 * but class func would look like
 * func = (res,req) => {}
 */
