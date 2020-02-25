import { Express } from 'express';
import { gameController, dealValidation } from '../game';

export function AppRoute(app: Express) {
   app.post('/api/v1/deal', dealValidation, gameController.deal);
}
