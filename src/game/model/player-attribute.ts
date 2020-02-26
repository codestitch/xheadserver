import { Card } from "./card";

export interface PlayerAttribute {
   name: string;
   blinds: Card[];
   cards: Card[];
   gameId: number;
}