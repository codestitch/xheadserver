import * as _ from 'lodash';

export class Game {
   drawPile: string[];
   deadPile: string[];
   playPile: string[];

   setDrawPile(cards: string[]) {
      this.drawPile = this.shuffler(cards);
   }

   addPlayPile(cards: string[]) {
      this.playPile = [...this.playPile, ...cards];
   }

   addDeadPile(cards: string[]) {
      this.deadPile = [...this.deadPile, ...cards];
   }

   draw(count: number) {
      if (this.drawPile && this.drawPile.length > 0) {
         const drawnCards = this.drawPile.slice(0, count);
         this.drawPile = _.difference(this.drawPile, drawnCards);
         return drawnCards;
      }
   }

   shuffler(cards: string[]): string[] {
      let currentIndex = cards.length;
      let temporaryValue;
      let randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
         // Pick a remaining element...
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;

         // And swap it with the current element.
         temporaryValue = cards[currentIndex];
         cards[currentIndex] = cards[randomIndex];
         cards[randomIndex] = temporaryValue;
      }

      return cards;
   }
}
