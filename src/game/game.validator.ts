import { check } from 'express-validator';

export const dealValidation = [
   check('hasjoker').isBoolean().withMessage('Value should be true or false'),
   check('deck').isInt().withMessage('Value should be a number')
];
