import { Schema, type, MapSchema } from '@colyseus/schema';
import { Player } from './player';
import { Game } from './game';
import { CARDS, JOKERS } from './models/card-list';
import { ToArray } from '../services/util';

export class GameState extends Schema {
   @type({ map: Player })
   players = new MapSchema<Player>();

   game = new Game();

   constructor(private hasJoker: boolean = false) {
      super();

      const cardPile = hasJoker ? [...CARDS, ...JOKERS] : [...CARDS];
      this.game.setDrawPile(cardPile);
   }

   createPlayer(id: string, name: string) {
      this.players[id] = new Player(name);
   }

   drawCard(id: string, cardCount: number) {
      const drawnCards = this.game.draw(cardCount);
      const _player = this.players[id];
      this.players[id].hands = [
         ...ToArray(_player.hands),
         drawnCards
      ].toString();
   }
}
