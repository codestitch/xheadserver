import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Game, Player } from '../db/models';
import { PlayerAttribute } from './model';

class GameController {
   newDeal(req: Request, res: Response, next: NextFunction) {
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
         .then(data => res.status(201).json(data))
         .catch((err: Error) => res.status(500).json(err));
   }

   all(req: Request, res: Response, next: NextFunction) {
      Game.findAll().then(games => res.status(200).json(games));
   }

   draw(req: Request, res: Response, next: NextFunction) {
      const gameId = parseInt(req.params.id, 10);
      Game.findByPk(gameId)
         .then(data => res.status(201).json(data))
         .catch((err: Error) => res.status(500).json(err));
   }

   newPlayer(req: Request, res: Response, next: NextFunction) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const player: PlayerAttribute = req.body;

      Player.create(player)
         .then(data => res.status(201).json(data))
         .catch((err: Error) => res.status(500).json(err));
   }
}

export const gameController = new GameController();
