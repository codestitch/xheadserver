import { Card } from "./card";

export interface Player {
   id: string;
   name: string;
   blinds: Card[];
   cards: Card[];
}