import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Game } from '../db/models';
import { CARDS, JOKERS } from './model';
import * as _ from 'lodash';
import { ToArray } from '../services/util';

class GameController {
   /**
    * Deals new game
    * @route POST /games/deal
    * @group Games - Game operation
    * @param {DealCommand.model} data.body.required - data for dealing
    * @returns {Game} 200 - Game object
    * @returns {Error}  default - Unexpected error
    */
   deal(req: Request, res: Response, next: NextFunction) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const isJoker = req.body.hasjoker === 'true';
      const deckCount: number = parseInt(req.body.deck, 10);
      const newGame = {
         hasjoker: isJoker,
         deck: deckCount,
         play: null,
         dead: null,
         used: null
      };

      Game.create(newGame)
         .then(data => res.status(201).json(data))
         .catch((err: Error) => res.status(500).json(err));
   }

   /**
    * Gets all games
    * @route GET /games
    * @group Games - Game operation
    * @returns {Game[]} 200 - An array of games info
    * @returns {Error}  default - Unexpected error
    */
   all(req: Request, res: Response) {
      Game.findAll().then(games => res.status(200).json(games));
   }

   /**
    * Draws cards
    * @route GET /games/{id}/draw
    * @group Games - Game operation
    * @param {number} id.path.required - game id.
    * @param {number} count.query.required - how many cards to draw.
    * @returns {string[]} 200 - An array of cards
    * @returns {Error}  default - Unexpected error
    */
   draw = (req: Request, res: Response) => {
      const gameId = parseInt(req.params.id, 10);
      const drawCount = parseInt(req.query.count, 10);

      this.drawCommitOption(gameId, drawCount).then(cards =>
         res.status(201).json(cards)
      );
   };

   /**
    * Draws and saves cards
    * @route GET /games/{id}/drawCommit
    * @group Games - Game operation
    * @returns {string[]} 200 - An array of cards
    * @returns {Error}  default - Unexpected error
    */
   drawCommit = (req: Request, res: Response) => {
      const gameId = parseInt(req.params.id, 10);
      const drawCount = parseInt(req.query.count, 10);

      this.drawCommitOption(gameId, drawCount).then(cards => {
         Game.update({ used: cards.toString() }, { where: { id: gameId } })
            .then(() => res.status(201).json(cards))
            .catch((err: Error) => res.status(500).json(err));
      });
   };

   private drawCommitOption = (
      gameId: number,
      drawCount: number
   ): Promise<string[]> => {
      return new Promise((res, rej) => {
         Game.findByPk(gameId).then(game => {
            res(this.drawCard(game.used, game.dead, drawCount, game.hasjoker));
         });
      });
   };

   drawCard = (
      used: string,
      dead: string,
      drawCount: number,
      hasjoker: boolean
   ) => {
      const fixedPile = hasjoker ? [...CARDS, ...JOKERS] : CARDS;
      const gameCards = ToArray(used, dead);
      const drawablePile = fixedPile.filter(x => !gameCards.includes(x));

      if (drawablePile.length > drawCount) {
         const newCards = this.pickCard(drawablePile, drawCount);
         return newCards;
      } else {
         return [];
      }
   };

   private pickCard = (deck: string[], count: number): string[] => {
      let cards = [];
      do {
         const drawIndex = Math.floor(Math.random() * deck.length) + 1;
         if (!cards.includes(deck[drawIndex])) {
            cards = [...cards, deck[drawIndex]];
         }
      } while (cards.length !== count);

      return cards;
   };
}

export const gameController = new GameController();
