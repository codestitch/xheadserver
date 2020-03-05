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
}
