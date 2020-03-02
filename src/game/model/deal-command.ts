/**
 * @typedef DealCommand
 * @property {boolean} hasjoker.required
 * @property {number} deck.required
 */
export interface DealCommand {
   hasjoker: boolean;
   deck: number;
}
