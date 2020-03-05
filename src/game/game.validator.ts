import { check } from 'express-validator';
import { CARDS } from '../card/models/card-list';

export const gameValidation = {
   newDeal: [
      check('hasjoker').isBoolean().withMessage('Value should be true or false'),
      check('deck').isInt().withMessage('Value should be a number')
   ],
};

export const playerValidation = {
   newPlayer: [
      check('name').not().isEmpty().withMessage('Should have a name'),
      check('gameId').not().isEmpty().withMessage('Should have game id'),
   ],
   newCards: [
      check('trumps.*').isIn(CARDS).withMessage('Should have trump cards'),
      check('cards.*').isIn(CARDS).withMessage('Should have cards at hand')
   ]
}