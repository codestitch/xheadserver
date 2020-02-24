import { Card } from "./card";

export interface Deck {
   id: string;
   count: number;
   cards: Card[];
}