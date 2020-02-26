import { Deck } from "./deck";
import { PlayerAttribute } from "./player-attribute";
import { Card } from ".";

export interface Game {
   id: string;
   deck: Deck;
   players: PlayerAttribute[];
   dead: Card[];
}