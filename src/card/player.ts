import { Schema, type } from '@colyseus/schema';
export class Player extends Schema {
   @type('string')
   name;

   @type('string')
   blinds;

   @type('string')
   hands;

   @type('string')
   trumps;

   constructor(private _name: string) {
      super();
      this.name = _name;
   }

   setCards(
      _hands: string,
      _blinds: string,
      _trumps: string
   ) {
      this.hands = _hands;
      this.blinds = _blinds;
      this.trumps = _trumps;
   }
}
