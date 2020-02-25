import { Game, GameInstance } from '../sql/models';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class GameController {
   deal(req: Request, res: Response, next: NextFunction) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const isJoker = req.body.hasjoker === 'true';
      const deckCount: number = parseInt(req.body.deck, 10);
      const cardCount: number = isJoker ? 54 : 52;
      const theGame = {
         hasjoker: isJoker,
         deck: deckCount,
         remaining: cardCount * deckCount,
         dead: null,
         used: null
      };

      Game.create(theGame)
         .then((data: GameInstance) => res.status(201).json(data))
         .catch((err: Error) => res.status(500).json(err));
   }
}

export const gameController = new GameController();
