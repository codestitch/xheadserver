/**
 * @typedef DealCommand
 * @property {boolean} hasjoker.required
 * @property {number} deckcount.required
 * @property {number} playercount.required
 */
export interface DealCommand {
   hasjoker: boolean;
   deckcount: number;
   playercount: number;
}
