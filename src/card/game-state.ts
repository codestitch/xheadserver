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

   removePlayer(id: string) {
      delete this.players[id];
   }

   start() {
      console.log(this.players);
      const playerIds = Object.keys(this.players.toJSON());
      playerIds.forEach(id => {
         const drawBlinds = this.game.drawAsString(3);
         const drawHands = this.game.drawAsString(6);
         this.players[id].setCards(
            drawHands,
            drawBlinds,
            ''
         );
      });
   }

   drawCard(id: string, cardCount: number) {
      const drawnCards = this.game.draw(cardCount);
      const playerHands = this.players[id].hands as string;
      this.players[id].hands = [...ToArray(playerHands), drawnCards].toString();
   }
}
