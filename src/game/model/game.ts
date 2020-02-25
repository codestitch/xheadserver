import { Deck } from "./deck";
import { Player } from "./player";
import { Card } from ".";

export interface Game {
   id: string;
   deck: Deck;
   players: Player[];
   dead: Card[];
}