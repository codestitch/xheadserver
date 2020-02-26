import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PlayerAttribute } from './model';
import { Player, Game } from '../db/models';
import { gameController } from './game.controller';
import * as _ from 'lodash';
import { ToArray } from '../services/util';

class PlayerController {
   create(req: Request, res: Response) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const name = req.body.name;
      const gameId = parseInt(req.body.gameId, 10);
      Game.findByPk(gameId)
         .then(game => {
            const cards = gameController.drawCard(
               game.used,
               game.dead,
               3,
               game.hasjoker
            );
            if (typeof cards === 'object' && cards.length > 0) {
               const newPlayer: PlayerAttribute = {
                  blinds: cards.toString(),
                  hands: null,
                  trumps: null,
                  name
               };
               const newCards = ToArray(game.used, cards);

               const gameUpdate = Game.update(
                  { used: newCards.toString() },
                  { where: { id: gameId } }
               );
               const createPlayer = Player.create(newPlayer);

               Promise.all([gameUpdate, createPlayer])
                  .then(data => res.status(201).json(data))
                  .catch((err: Error) => res.status(500).json(err));
            } else {
               res.status(500).json({ error: 'error' });
            }
         })
         .catch((err: Error) => res.status(500).json(err));
   }

   newCards(req: Request, res: Response) {
      const playerId = parseInt(req.body.playerId, 10);
      const gameId = parseInt(req.body.gameId, 10);
      const { hands, trumps } = req.body;

      Game.findByPk(gameId).then(game => {
         const newCards = ToArray(game.used, hands, trumps);

         const gameUpdate = Game.update(
            { used: newCards.toString() },
            { where: { id: gameId } }
         );
         const playerUpdate = Player.update(
            { hands, trumps },
            { where: { id: playerId } }
         );
         Promise.all([gameUpdate, playerUpdate])
            .then(data => res.status(201).json(data))
            .catch((err: Error) => res.status(500).json(err));
      });
   }

   getCards(req: Request, res: Response) {
      const playerId = parseInt(req.params.id, 10);

      Player.findByPk(playerId)
         .then(({ hands, blinds, trumps }) =>
            res.status(201).json({ hands, blinds, trumps })
         )
         .catch((err: Error) => res.status(500).json(err));
   }
}

export const playerController = new PlayerController();
