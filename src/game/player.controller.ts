import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PlayerAttribute } from './model';
import { Player, Game } from '../db/models';
import { gameController } from './game.controller';
import * as _ from 'lodash';
import { ToArray } from '../services/util';

class PlayerController {
   /**
    * Creates new player
    * @route POST /api/v1/player/create
    * @group Player - Game operation
    * @param {string} name.query.required - player name.
    * @param {number} gameId.query.required - game id.
    * @returns {Player} 200 - Player object
    * @returns {Error}  default - Unexpected error
    */
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
                  .then(([_, player]) => res.status(201).json(player))
                  .catch((err: Error) => res.status(500).json(err));
            } else {
               res.status(500).json({ error: 'error' });
            }
         })
         .catch((err: Error) => res.status(500).json(err));
   }

   /**
    * Saves new cards of player
    * @route POST /api/v1/player/newcards
    * @group Player - Game operation
    * @param {number} playerId.query.required - player id.
    * @param {number} gameId.query.required - game id.
    * @param {string[]} hands.query.required - hand cards.
    * @param {string[]} trumps.query.required - face up cards.
    * @returns {Player} 200 - Player object
    * @returns {Error}  default - Unexpected error
    */
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
            .then(([_, player]) => res.status(201).json(player))
            .catch((err: Error) => res.status(500).json(err));
      });
   }

   /**
    * Gets player hands and trump cards
    * @route POST /api/v1/player/newcards
    * @group Player - Game operation
    * @param {number} playerId.query.required - player id.
    * @returns {string[]} 200 - Hand and trump cards
    * @returns {Error}  default - Unexpected error
    */
   getCards(req: Request, res: Response) {
      const playerId = parseInt(req.params.id, 10);

      Player.findByPk(playerId)
         .then(({ hands, trumps }) => res.status(201).json({ hands, trumps }))
         .catch((err: Error) => res.status(500).json(err));
   }
}

export const playerController = new PlayerController();
