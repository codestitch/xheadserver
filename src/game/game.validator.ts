import { check } from 'express-validator';
import { CARDS } from './model/card.data';

export const gameValidation = {
   newDeal: [
      check('hasjoker').isBoolean().withMessage('Value should be true or false'),
      check('deck').isInt().withMessage('Value should be a number')
   ],
   newPlayer: [
      check('blinds.*').isIn(CARDS).withMessage('Should have blind cards'),
      check('cards.*').isIn(CARDS).withMessage('Should have cards at hand'),
      check('name').not().isEmpty().withMessage('Should have a name'),
      check('gameId').not().isEmpty().withMessage('Should have game id'),
   ]
};
